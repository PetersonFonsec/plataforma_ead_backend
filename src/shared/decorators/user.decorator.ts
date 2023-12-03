import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((field, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (field && request[field]) return request[field]
    return request.token;
})