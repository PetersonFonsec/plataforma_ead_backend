import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from "@nestjs/core"
import { Observable } from 'rxjs';

import { RolesWithPermission } from '../decorators/role.decorator';
import { TOKEN_KEY } from '../../auth/auth.guard';
import { Roles } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(RolesWithPermission, context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request[TOKEN_KEY];

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(roles: Roles[], userRole: Roles) {
    return roles.includes(userRole)
  }
}
