import { Response, NextFunction } from 'express';
import { RequestPlus } from './authenticator';

export function authorization(
  req: RequestPlus,
  res: Response,
  next: NextFunction
) {
  try {
    next();
  } catch (error) {
    next(error);
  }
}
