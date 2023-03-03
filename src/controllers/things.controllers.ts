import { NextFunction, Request, Response } from 'express';
import { knowledge } from '../entities/things.models.js';
import { User } from '../entities/user.model.js';
import { HTTPError } from '../errors/errors.js';
import { RequestPlus } from '../interceptors/authenticator.js';
import { Repo } from '../repository/repo.interface.js';
import createDebug from 'debug';

const debug = createDebug('W7CH2: things controller');
export class ThingsControllers {
  constructor(public repo: Repo<knowledge>, public repoUser: Repo<User>) {
    this.repo = repo;
    this.repoUser = repoUser;
  }

  async getAllThings(_req: Request, res: Response, next: NextFunction) {
    debug('getAll');
    try {
      const data = await this.repo.query();
      res.json({ results: data });
    } catch (error) {
      next(error);
    }
  }

  async getThingById(req: Request, res: Response, next: NextFunction) {
    try {
      debug('getThingById');
      const data = await this.repo.queryId(req.params.id);
      res.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  // RequestPlus es el que tiene la info del usuario.
  async postThing(req: RequestPlus, res: Response, next: NextFunction) {
    try {
      debug('postThing');
      const userId = req.info?.id;
      if (!userId) throw new HTTPError(404, 'NotFound', 'Not found user id');
      // queryId se va a encargar de buscar el id del usuario, si no lo encuentra se va a encargar de tirar un msj de error.
      const actualUser = await this.repoUser.queryId(userId);
      // Le asignamos al owner el id del usuario que ya fue verificado.
      req.body.owner = userId;
      const newThing = await this.repo.create(req.body);

      // Opcion bidireccional
      //pusheamos al array knowledge una cosa nueva
      actualUser.knowledge.push(newThing);
      // Luego actualizamos
      this.repoUser.update(actualUser);

      res.json({ results: [newThing] });
    } catch (error) {
      next(error);
    }
  }

  updateThing(req: Request, res: Response, next: NextFunction) {
    debug('updateThing');
    try {
      req.params.id = req.body.id ? req.params.id : req.body.id;
      this.repo.update(req.body).then((data) => {
        res.json({ results: [data] });
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteThing(req: Request, res: Response, next: NextFunction) {
    console.log('delete');
    try {
      await this.repo.delete(req.params.id);
      res.json({ results: [] });
    } catch (error) {
      next(error);
    }
  }
}
