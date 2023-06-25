import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

const logger = new Logger('LoggerMiddleware');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    logger.log(req.url);
    next();
  }
}
