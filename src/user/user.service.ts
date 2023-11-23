import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { ConsultUserResponse } from './dto/consult-user.dto';

@Injectable()
export class UserService {
    private readonly selectFields = {
        email: true,
        name: true,
        role: true,
        id: true,
    }

    constructor(private prisma: PrismaService) { }

    async createUser({ email, password, name }: CreateUserDTO) {
        const userExist = await this.prisma.user.findUnique({ where: { email }, select: this.selectFields });

        password = bcrypt.hashSync(password, 8);

        if (userExist) {
            throw new BadRequestException(
                `there is already a user with this email: ${email}`,
            );
        }

        return this.prisma.user.create({
            data: {
                name,
                email,
                password
            },
            select: {
                id: true,
                name: true
            }
        });
    }

    async findUser(id: number): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { id }, select: this.selectFields });
        if (!user) throw new NotFoundException(`Não encontrado usuario com id: ${id}`);
        return user;
    }

    async getAllUser(): Promise<any[]> {
        return await this.prisma.user.findMany({
            select: this.selectFields
        });
    }

    async updateUser(id: number, data: UpdateUserDTO): Promise<any> {
        delete data.password;

        if (! await this.existUser(id))
            return this.prisma.user.update({ where: { id }, data, select: this.selectFields });
    }

    async forgetPassword(id: number, newPassword: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException(`User not found`);

        const password = bcrypt.hashSync(newPassword, 8);
        return this.prisma.user.update({ where: { id }, data: { password }, select: this.selectFields });
    }

    async updatePassword(fields: UpdatePasswordDTO): Promise<any> {
        let { password, current_password, email } = fields;
        await this.validPassword(current_password, email);

        password = bcrypt.hashSync(password, 8);

        return this.prisma.user.update({ where: { email }, data: { password }, select: this.selectFields });
    }

    async deleteUser(id: number): Promise<ConsultUserResponse> {
        if (await this.existUser(id))
            return this.prisma.user.delete({ where: { id }, select: this.selectFields });
    }

    async validPassword(password, email) {
        const user = await this.prisma.user.findUnique({ where: { email }, select: { password: true } });
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword || !user) {
            throw new NotFoundException(`Dados incorretos`);
        }

        return user;
    }

    async existUser(id: number) {
        return this.findUser(id);
    }
}
