import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// https://docs.nestjs.com/custom-decorators
export const GetUserReq = createParamDecorator((key: string, context: ExecutionContext) => {
  // key: strategy user -> id, email
  const request = context.switchToHttp().getRequest();
  const user = request.user;
  return key ? user?.[key] : user;
});
