import { Router as router } from 'express';
import { UserControllers } from '../controllers/users.controller.js';
import { UserMongoRepo } from '../repository/user.mongo.repo.js';

export const usersRouter = router();
const repo = new UserMongoRepo();

const controllers = new UserControllers(repo);

usersRouter.post('/register', controllers.register.bind(controllers));
usersRouter.post('/login', controllers.login.bind(controllers));
