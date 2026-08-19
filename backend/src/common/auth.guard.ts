import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwt = new JwtService({
    secret: process.env.JWT_SECRET || 'dev-secret',
  });

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const token = (req.headers.authorization || '').replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Authentication required');
    }

    try {
      req.user = this.jwt.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
