import { Router as router } from 'express';
import { ThingsControllers } from '../controllers/things.controllers.js';
import { ThingsMongoRepo } from '../repository/things.mongo.repo.js';
import { authenticator } from '../interceptors/authenticator.js';
import { authorization } from '../interceptors/authorization.js';
import { UserMongoRepo } from '../repository/user.mongo.repo.js';

const repo = new ThingsMongoRepo();
const repoUser = new UserMongoRepo();
const controllers = new ThingsControllers(repo, repoUser);

export const thingsRouter = router();

thingsRouter.get(
  '/',
  authenticator,
  controllers.getAllThings.bind(controllers)
);
thingsRouter.get(
  '/:id',
  authenticator,
  controllers.getThingById.bind(controllers)
);
thingsRouter.post(
  '/',
  authenticator,

  controllers.postThing.bind(controllers)
);
thingsRouter.patch(
  '/:id',
  authenticator,
  authorization,
  controllers.updateThing.bind(controllers)
);
thingsRouter.delete(
  '/:id',
  authenticator,
  authorization,
  controllers.deleteThing.bind(controllers)
);
