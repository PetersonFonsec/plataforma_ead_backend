import { Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { collegeCreateDTO } from './dto/college-create.dto';
import { UserTokenI } from '../shared/interfaces/user-token';
import { RegisterStudiantDTO } from "./dto/register-student.dto";
import { Cdn } from '../cdn/cdn';

@Injectable()
export class CollegeService {
  private readonly selectFields = {
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    thumb: true
  }

  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private readonly cdnService: Cdn,
  ) { }

  async create({ name, thumb, primaryColor, secundaryColor }: collegeCreateDTO, user: UserTokenI) {
    const collegeCreate = await this.prisma.college.create({
      data: {
        name,
        user: {
          connect: { email: user.email }
        },
      }
    });

    if (thumb) {
      const result = await this.cdnService.upload(thumb).toPromise();
      thumb = result.result.id;
    }

    await this.prisma.collegeStyle.create({
      data: {
        thumb,
        primaryColor,
        secundaryColor,
        college: {
          connect: { id: collegeCreate.id }
        },
      }
    });

    return this.getById(collegeCreate.id, user.id);
  }

  async getByUser(userId: number) {
    const user = await this.prisma.college.findMany({
      where: { userId },
      include: {
        CollegeStyle: true
      },
    });

    if (!user) throw new NotFoundException(`College não encontrado`);
    return user;
  }

  async getById(id: number, userId: number) {
    const college = await this.prisma.college.findUnique({
      where: { userId, id },
      select: {
        CollegeStyle: { where: { collegeId: id } },
        Course: { where: { collegeId: id } },
        createdAt: true,
        updatedAt: true,
        id: true,
        userId: true,
        name: true
      }
    });
    if (!college) throw new NotFoundException(`College não encontrado`);

    for (const style of college.CollegeStyle) {
      style.thumb = await this.cdnService.getImage(style.thumb).toPromise()
    }

    return college;
  }

  async registerUser({ email, documentNumber, collegeId, role }: RegisterStudiantDTO) {
    const user = { email, documentNumber, password: "", confirm_password: "", name: "", role };
    const { id } = await this.userService.createUser(user);

    return this.prisma.collegeStudent.create({
      data: {
        user: {
          connect: { id }
        },
        college: {
          connect: { id: collegeId }
        },

      }
    });
  }
}
