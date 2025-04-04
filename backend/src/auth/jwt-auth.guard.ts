// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { AuthenticatedRequest } from './request.interface'; 

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
//     const authHeader = request.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return false;
//     }

//     const token = authHeader.split(' ')[1]; // Extract token
//     try {
//       const decoded = this.jwtService.verify(token); // Verify token
//       request.user = decoded; // Attach decoded user to request
//       return true;
//     } catch (error) {
//       return false; // Token is invalid
//     }
//   }
// }


import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthenticatedRequest } from './request.interface'; 

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No valid token found');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token); // Verify token
      console.log("Decoded JWT:", decoded); // Debugging

      // Ensure the token contains `id` and `username`
      if (!decoded.sub || !decoded.username) {
        throw new UnauthorizedException('Invalid token payload');
      }

      request.user = { id: decoded.sub, username: decoded.username }; // Attach user object
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
