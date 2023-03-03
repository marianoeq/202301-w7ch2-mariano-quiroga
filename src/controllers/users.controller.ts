import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.model.js';
import { Repo } from '../repository/repo.interface.js';
import createDebug from 'debug';
import { HTTPError } from '../errors/errors.js';
import { Auth, PayloadToken } from '../helpers/auth.js';
const debug = createDebug('W7CH2: controller');

export class UserControllers {
  constructor(public repo: Repo<User>) {
    this.repo = repo;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Register User');
      if (!req.body.email || !req.body.password)
        throw new HTTPError(400, 'Unauthorized', 'Email invalid');
      req.body.password = await Auth.createHash(req.body.password);
      req.body.Knowledge = [];
      const data = await this.repo.create(req.body);

      console.log('register: ', data);
      res.status(200);
      res.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('login', req.body);
      debug('login User');
      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Email invalid');

      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });
      console.log('login: ', data);
      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Email not found');

      if (!(await Auth.compare(req.body.password, data[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'Password not match');

      const payload: PayloadToken = {
        id: data[0].id,
        email: data[0].email,
        role: 'Admin',
      };
      console.log('payload: ', payload);
      const token = Auth.createJWT(payload);
      res.status(202);
      res.json({ results: { token } });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    console.log('delete');
    try {
      await this.repo.delete(req.params.id);
      res.json({ results: [] });
    } catch (error) {
      next(error);
    }
  }
}
