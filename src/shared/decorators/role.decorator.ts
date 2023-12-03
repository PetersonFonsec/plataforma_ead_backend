import { Reflector } from '@nestjs/core';
import { Roles } from "../enums/role.enum";

export const ROLES_KEY = "rolesWithPermission";

export const RolesWithPermission = Reflector.createDecorator<Roles[]>()