import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// https://docs.nestjs.com/custom-decorators
export const UserDecorator = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request: Express.Request = context.switchToHttp().getRequest();
  return request.user;
});
