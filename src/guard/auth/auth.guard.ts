import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
    const req = context.switchToHttp().getRequest<Request>();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing or malformed');
    }

    // const token = authHeader.split(' ')[1];
    // console.log(token);

      // const decoded = await this.jwtService.verifyAsync(authHeader);
      const decoded = await jwt.verify(authHeader, 'abcdefghijklmnopqrstuvwxyz12343#$%#^#&@3');
      console.log(decoded);
      req['user'] = decoded; // Attach decoded user to request object
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
