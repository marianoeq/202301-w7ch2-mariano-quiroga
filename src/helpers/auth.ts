// Metodos static permite acceder al metodo sin tener que instanciar la clase. Directamente llamando a la clase y luego el metodo. ex: Auth.createJWT()
import JWT from 'jsonwebtoken';
import { config } from '../config.js';
import bcrypt from 'bcryptjs';
import { HTTPError } from '../errors/errors.js';
export interface PayloadToken extends JWT.JwtPayload {
  id: string;
  email: string;
  role: string;
}

const salt = 10;

export class Auth {
  static createJWT(payload: PayloadToken) {
    // Le asignamos un string porque si o si va a recibir un string. Nunva va a ser undefined.
    return JWT.sign(payload, config.jwtSecret as string);
  }

  static verifyJWT(token: string): PayloadToken {
    const result = JWT.verify(token, config.jwtSecret as string);
    // Hacemos comprobacion de string para tirar error porque el caso positivo es un payload.
    if (typeof result === 'string')
      throw new HTTPError(498, 'Invalid Payload', result);
    return result as PayloadToken;
  }

  static createHash(value: string) {
    return bcrypt.hash(value, salt);
  }

  static compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
