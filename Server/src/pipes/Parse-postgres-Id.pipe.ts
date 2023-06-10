import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParsePostgresIdPipe implements PipeTransform<string> {
  private logger = new Logger(ParsePostgresIdPipe.name);

  transform(value: string, metadata: ArgumentMetadata): string {
    // NOTICE: ROUTE PIPE
    this.logger.log('===🚀 TRIGGER ROUTE PARAMS PIPE 🚀===');
    // Update the validation logic for PostgreSQL IDs
    const idRegex = /^[1-9]\d*$/; // Use the appropriate regex for PostgreSQL IDs
    if (!idRegex.test(value)) {
      throw new BadRequestException('Invalid ID');
    }
    return value;
  }
}
