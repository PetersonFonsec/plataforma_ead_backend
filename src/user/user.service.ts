import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UpdatePasswordDTO } from './dto/update-password.dto';
import { ConsultUserResponse } from './dto/consult-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ActiveUserDTO } from './dto/active-user.dto';
import Mediator from '../shared/events/mediator';
import { Events } from '../shared/events/events';
import { Cdn } from 'src/cdn/cdn';

@Injectable()
export class UserService {
  private readonly selectFields = {
    email: true,
    name: true,
    role: true,
    photo: true,
    id: true,
  }

  constructor(
    private prisma: PrismaService,
    private mediator: Mediator,
    private readonly cdnService: Cdn,
  ) { }

  async createUser(user: CreateUserDTO, active = false) {
    let { password, email, documentNumber, confirm_password } = user;

    if (password != confirm_password) {
      throw new BadRequestException(`as senhas não são iguais`);
    }

    const userExist = await this.prisma.user.findFirst({ where: { OR: [{ documentNumber }, { email }] }, select: { ...this.selectFields, documentNumber: true } });

    if (userExist) {
      throw new BadRequestException(
        `já existe um usuario com esse email: ${email} ou com esse numero de documento ${userExist.documentNumber}`,
      );
    }

    user.password = bcrypt.hashSync(password, 8);

    delete user.confirm_password;

    const newUser = this.prisma.user.create({
      data: { ...user, active },
      select: this.selectFields
    });

    await this.mediator.publish(Events.createdNewUser, newUser);

    return newUser;
  }

  async activeUser({ id }: ActiveUserDTO) {
    await this.find({ id });
    return this.prisma.user.update({ where: { id }, data: { active: true } });
  }

  async getAllUser(): Promise<any[]> {
    return await this.prisma.user.findMany({ select: this.selectFields });
  }

  async updateUser(id: number, data: UpdateUserDTO): Promise<any> {
    delete data.password;

    if (data.photo) {
      try {
        const result = await this.cdnService.upload(data.photo).toPromise();
        data.photo = result.result.id;
      } catch (error) {
        console.log(error);
      }
    }

    if (!await this.find({ id })) return;

    const updatedUser = await this.prisma.user.update({ where: { id }, data, select: this.selectFields });
    if (updatedUser.photo) {
      updatedUser.photo = await this.cdnService.getImage(updatedUser.photo).toPromise()
    }

    return updatedUser;
  }

  async updatePassword(fields: UpdatePasswordDTO): Promise<any> {
    let { password, current_password, email } = fields;
    await this.validPassword(current_password, email);

    password = bcrypt.hashSync(password, 8);

    return this.prisma.user.update({ where: { email }, data: { password }, select: this.selectFields });
  }

  async deleteUser(id: number): Promise<ConsultUserResponse> {
    if (await this.find({ id }))
      return this.prisma.user.delete({ where: { id }, select: this.selectFields });
  }

  async me(id: number): Promise<any> {
    let colleges = await this.prisma.college.findMany({
      where: {
        userId: id
      }, select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        _count: true,
        CollegeStyle: true,
        Course: true,
        CollegeStudent: true,
      }
    });

    for (let index = 0; index < colleges.length; index++) {
      const college = colleges[index];

      for (let index = 0; index < college.CollegeStyle.length; index++) {
        const collegeStyle = college.CollegeStyle[index];
        if (collegeStyle.thumb) {
          collegeStyle.thumb = await this.cdnService.getImage(collegeStyle.thumb).toPromise();
        }
      }

      for (let index = 0; index < college.Course.length; index++) {
        const course = college.Course[index];
        if (course.thumb) {
          course.thumb = await this.cdnService.getImage(course.thumb).toPromise();
        }
      }
    }

    return { colleges }
  }

  async validPassword(password, email) {
    const fields = { ...this.selectFields, password: true };
    const user = await this.prisma.user.findUnique({ where: { email }, select: fields });
    if (!user) {
      throw new NotFoundException(` Email incorretos`);
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new NotFoundException(`Senha  incorretos`);
    }

    if (user.photo) {
      user.photo = await this.cdnService.getImage(user.photo).toPromise()
    }

    return user;
  }

  async find(where: any) {
    const user = await this.prisma.user.findUnique({ where, select: this.selectFields });
    if (!user) throw new NotFoundException(`Usuario não encontrado`);
    return user;
  }
}
