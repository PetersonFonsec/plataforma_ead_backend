import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() user: CreateUserDTO): Promise<{
        id: number;
        name: string;
    }> {
        return this.userService.createUser(user);
    }

    @Get('/:id')
    get(@Param('id') id: string): Promise<any> {
        return this.userService.findUser(parseInt(id));
    }

    @Get()
    getAll(): Promise<any[]> {
        return this.userService.getAllUser();
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() user: UpdateUserDTO): Promise<any> {
        return this.userService.updateUser(parseInt(id), user);
    }

    @Patch('/updatePassword/')
    updatePassword(@Body() user: UpdatePasswordDTO): Promise<any> {
        return this.userService.updatePassword(user);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<any> {
        return this.userService.deleteUser(parseInt(id));
    }
}
