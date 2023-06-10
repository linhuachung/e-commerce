import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse().valueOf()?.['error'] || 'Error';

    // NOTICE: GLOBAL FILTER
    this.logger.debug('===🚀 TRIGGER GLOBAL FILTER 🚀===');
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: error,
      // exception: exception,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
