import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../shared/guards/roles.guards';
import { RolesWithPermission } from 'src/shared/decorators/role.decorator';
import { Roles } from 'src/shared/enums/role.enum';

@Controller('event')
@UseGuards(AuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  @RolesWithPermission([Roles.DIRECTOR, Roles.DIRECTOR, Roles.STUDENT])
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Patch(':id')
  @RolesWithPermission([Roles.DIRECTOR, Roles.DIRECTOR, Roles.STUDENT])
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @RolesWithPermission([Roles.DIRECTOR, Roles.DIRECTOR, Roles.STUDENT])
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get('course/:id')
  findOne(@Param('id') id: string) {
    return this.eventService.findByCourse(+id);
  }
}
