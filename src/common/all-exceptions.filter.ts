import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const body = exception instanceof HttpException ? exception.getResponse() : null;
    const message =
      typeof body === 'string' ? body : (body as { message?: string | string[] } | null)?.message ?? 'Erreur interne du serveur';
    res.status(status).json({ statusCode: status, message, path: req.url, timestamp: new Date().toISOString() });
  }
}
