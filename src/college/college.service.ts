import { Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { collegeCreateDTO } from './dto/college-create.dto';
import { UserTokenI } from 'src/shared/interfaces/user-token';
import { RegisterStudiantDTO } from "./dto/register-student.dto";

@Injectable()
export class CollegeService {
    private readonly selectFields = {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        thumb: true
    }

    constructor(private prisma: PrismaService, private userService: UserService) { }

    async create({ name, thumb, primaryColor, secundaryColor }: collegeCreateDTO, user: UserTokenI) {
        const collegeCreate = await this.prisma.college.create({
            data: {
                name,
                user: {
                    connect: { email: user.email }
                },
            }
        });

        return this.prisma.collegeStyle.create({
            data: {
                thumb,
                primaryColor,
                secundaryColor,
                college: {
                    connect: { id: collegeCreate.id }
                },
            }
        });
    }

    async getByUser(userId: number) {
        const user = await this.prisma.college.findMany({
            where: { userId },
            select: this.selectFields
        });

        if (!user) throw new NotFoundException(`College não encontrado`);
        return user;
    }

    async getById(id: number, userId: number) {
        const user = await this.prisma.college.findUnique({
            where: { userId, id },
            select: this.selectFields
        });

        if (!user) throw new NotFoundException(`College não encontrado`);
        return user;
    }

    async registerUser({ email, documentNumber, collegeId, role }: RegisterStudiantDTO) {
        const user = { email, documentNumber, password: "", name: "", role };
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
