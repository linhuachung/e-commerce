import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseRouteValidationPipe implements PipeTransform<string> {
  logger = new Logger(ParseRouteValidationPipe.name);
  transform(value: string, metadata: ArgumentMetadata): string {
    // NOTICE: ROUTE PIPE
    this.logger.verbose('===🚀 TRIGGER ROUTE PIPE 🚀===');
    return value;
  }
}
