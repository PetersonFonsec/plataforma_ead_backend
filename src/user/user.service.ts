import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UpdatePasswordDTO } from './dto/update-password.dto';
import { ConsultUserResponse } from './dto/consult-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ActiveUserDTO } from './dto/active-user.dto';

@Injectable()
export class UserService {
    private readonly selectFields = {
        email: true,
        name: true,
        role: true,
        photo: true,
        id: true,
    }

    constructor(private prisma: PrismaService) { }

    async createUser(user: CreateUserDTO, active = false) {
        let { password, email } = user;

        const userExist = await this.prisma.user.findUnique({ where: { email }, select: this.selectFields });

        if (userExist) {
            throw new BadRequestException(
                `já existe um usuario com esse email: ${email}`,
            );
        }

        user.password = bcrypt.hashSync(password, 8);

        return this.prisma.user.create({
            data: { ...user, active },
            select: this.selectFields
        });
    }

    async activeUser({ id }: ActiveUserDTO) {
        await this.find({ id });
        return this.prisma.user.update({ where: { id }, data: { active: true } });
    }

    async getAllUser(): Promise<any[]> {
        return await this.prisma.user.findMany({ where: { active: true }, select: this.selectFields });
    }

    async updateUser(id: number, data: UpdateUserDTO): Promise<any> {
        delete data.password;

        if (! await this.find({ id }))
            return this.prisma.user.update({ where: { id }, data, select: this.selectFields });
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
        const user = await this.prisma.user.findUnique({ where: { email } });
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
