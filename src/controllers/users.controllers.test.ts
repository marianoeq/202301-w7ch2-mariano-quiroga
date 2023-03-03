import { Request, Response } from 'express';
import { User } from '../entities/user.model';
import { Repo } from '../repository/repo.interface';
import { UserControllers } from './users.controller.js';
import { Auth } from '../helpers/auth';
jest.mock('../helpers/auth.js');

describe('Given the regiser method from  UsersController', () => {
  const req = {
    // Aqui le paso solo el body para que me lea el req.body pero sin pasarle el email y el password para que entre en el primero error debido a que no me encuentra dichas propiedades.
    body: {},
  } as Request;

  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();

  const mockRepo = {
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as Repo<User>;
  const controller = new UserControllers(mockRepo);

  describe('When there are NOT email or password in the body', () => {
    test('Then next should be called', async () => {
      await controller.register(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when There are email and password', () => {
    const req = {
      body: { email: 'jsjsjs', password: 'jsjal' },
    } as Request;

    test('Then res.json should be called ', async () => {
      await controller.register(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('when There is email ', () => {
    const req = {
      body: { email: 'jsjsjs' },
    } as Request;

    test('Then res.json should be called ', async () => {
      await controller.register(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('when There is  password ', () => {
    const req = {
      body: { password: 'jsjsjs' },
    } as Request;

    test('Then res.json should be called ', async () => {
      await controller.register(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
  });
});

describe('Give Login method from UsersController', () => {
  const mockRepo = {
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as Repo<User>;

  const controller = new UserControllers(mockRepo);

  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const req = {
    body: { email: 'jsjsjs', password: 'jsjal' },
  } as Request;

  const next = jest.fn();

  Auth.compare = jest.fn().mockResolvedValue(true);

  describe('When all is ok', () => {
    (mockRepo.search as jest.Mock).mockResolvedValue(['test']);
    test('Then json should be called', async () => {
      await controller.login(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
  });
  // TEMP:
  // describe('',()=>{
  //   test('',()=>{

  //   })
  // })
});
