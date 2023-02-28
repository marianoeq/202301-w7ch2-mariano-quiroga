import { Router as router } from 'express';
import { ThingsControllers } from '../controllers/things.controllers.js';

import { ThingsMongoRepo } from '../repository/things.mongo.repo.js';
const repo = new ThingsMongoRepo();

const controllers = new ThingsControllers(repo);

export const thingsRouter = router();

thingsRouter.get('/', controllers.getAllThings.bind(controllers));
thingsRouter.get('/:id', controllers.getThingById.bind(controllers));
thingsRouter.post('/', controllers.postThing.bind(controllers));
thingsRouter.patch('/:id', controllers.updateThing.bind(controllers));
thingsRouter.delete('/:id', controllers.deleteThing.bind(controllers));
