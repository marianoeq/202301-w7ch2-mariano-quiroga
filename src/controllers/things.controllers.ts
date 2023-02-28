import { NextFunction, Request, Response } from 'express';
import { knowledge } from '../entities/things.models.js';
import { Repo } from '../repository/repo.interface.js';
import createDebug from 'debug';
const debug = createDebug('w6:controller');
export class ThingsControllers {
  constructor(public repo: Repo<knowledge>) {}
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
    debug('getThingById');
    const data = await this.repo.queryId(Number(req.params.id));
    res.json({ results: [data] });
  }
  async postThing(req: Request, res: Response, next: NextFunction) {
    debug('postThing');
    const data = await this.repo.create(req.body);
    res.json({ results: [data] });
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
    debug('delete');
    await this.repo.delete(Number(req.params.id));
    res.json({ results: [] });
  }
}
