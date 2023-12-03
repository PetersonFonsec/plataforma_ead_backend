import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { collegeCreateDTO } from './dto/college-create.dto';
import { UserTokenI } from 'src/shared/interfaces/user-token';
import { UserService } from 'src/user/user.service';

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

    async create(college: collegeCreateDTO, user: UserTokenI) {
        return this.prisma.college.create({
            data: {
                ...college,
                user: {
                    connect: { email: user.email }
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
}
