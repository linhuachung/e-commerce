import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthorizationGuard extends AuthGuard('jwt') {
  private logger = new Logger(JwtAuthorizationGuard.name);

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    this.logger.log('===🚀 TRIGGER JWT AUTHGUARD MIDDLEWARE 🚀===');
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }
}
