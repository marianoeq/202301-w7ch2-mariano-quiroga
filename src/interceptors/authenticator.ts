import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/errors';
import { Auth, PayloadToken } from '../helpers/auth';

export interface RequestPlus extends Request {
  info?: PayloadToken;
}

export async function authenticator(
  req: RequestPlus,
  res: Response,
  next: NextFunction
) {
  try {
    // Req.get('Authorization') captura la cabecera
    const authHeader = await req.get('Authorization');
    // Comprueba la cabecera
    if (!authHeader)
      throw new HTTPError(498, 'Invalid Token', 'Not value in Auth header');
    // Comprueba que la cabecera tambien tenga el Bearer
    if (!authHeader.startsWith('Bearer'))
      throw new HTTPError(498, 'Invalid Token', 'Not bearer in in auth header');
    // Si hay header con Authorization en cabecera seguido de Bearer lo guardamos en una variable y le hacemos un slice para capturar solo el token y deshacernos de todo lo demos
    const token = authHeader.slice(7);
    const payload = Auth.verifyJWT(token);
    // En res.info estamos guardando todos los datos del usuario que se ha loggeado correctamente.
    req.info = payload;
    // Como este metodo es un middleware debido que recibe un next como parametro lo usamos al final para que no se quede parado el flujo del codigo.
    next();
  } catch (error) {
    next(error);
  }
}
