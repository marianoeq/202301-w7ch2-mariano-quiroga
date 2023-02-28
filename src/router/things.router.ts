import { Router } from 'express';
import { ThingsControllers } from '../controllers/things.controllers.js';
// import { ThingsFileRepo } from '../repository/things.file.repo.js';
import { mongoRepo } from '../repository/things.mongo.repo.js';

//const repo = new ThingsFileRepo();
const repo = new mongoRepo();
const controllers = new ThingsControllers(repo);

export const thingsRouter = Router();

thingsRouter.get('/', controllers.getAllThings.bind(controllers));
thingsRouter.get('/:id', controllers.getThingById.bind(controllers));
thingsRouter.post('/', controllers.postThing.bind(controllers));
thingsRouter.patch('/:id', controllers.updateThing.bind(controllers));
thingsRouter.delete('/:id', controllers.deleteThing.bind(controllers));
