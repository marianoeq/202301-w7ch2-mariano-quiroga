import { Router as router } from 'express';
import { UserControllers } from '../controllers/users.controller.js';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

export const usersRouter = router();
const repo = new UsersMongoRepo();

const controllers = new UserControllers(repo);

usersRouter.post('/register', controllers.register.bind(controllers));
usersRouter.post('/login', controllers.login.bind(controllers));
