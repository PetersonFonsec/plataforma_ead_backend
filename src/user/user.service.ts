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

    if (await this.find({ id })) {
      return this.prisma.user.update({ where: { id }, data, select: this.selectFields });
    }
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

  async validPassword(password, email) {
    const fields = { ...this.selectFields, password: true };
    const user = await this.prisma.user.findUnique({ where: { email }, select: fields });
    if (!user) {
      throw new NotFoundException(`Senha ou Email incorretos`);
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new NotFoundException(`Senha ou Email incorretos`);
    }

    return user;
  }

  async find(where: any) {
    const user = await this.prisma.user.findUnique({ where, select: this.selectFields });
    if (!user) throw new NotFoundException(`Usuario não encontrado`);
    return user;
  }
}
