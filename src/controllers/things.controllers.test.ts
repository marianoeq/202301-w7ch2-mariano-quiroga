import { Request, Response, NextFunction } from 'express';
import { ThingsMongoRepo } from '../repository/things.mongo.repo';
import { ThingsControllers } from './things.controllers';
import { Repo } from '../repository/repo.interface';
import { User } from '../entities/user.model';
describe('Given ThingsControllers', () => {
  const repo: ThingsMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
  };

  const req = { body: {}, params: { id: '' } } as unknown as Request;
  const res = { json: jest.fn() } as unknown as Response;
  const next = jest.fn();
  const repoUser = {
    queryId: jest.fn(),
    update: jest.fn(),
  } as unknown as Repo<User>;
  const controller = new ThingsControllers(repo, repoUser);

  describe('When getAllThings is called ', () => {
    test('Then If there are no errors', async () => {
      await controller.getAllThings(req, res, next);
      expect(repo.query).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
    test('Then If there are errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error('error'));
      await controller.getAllThings(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When getThingByID is called ', () => {
    test('Then If repo.queryId received an id returns a json', async () => {
      await controller.getThingById(req, res, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
    test('Then If the repo.queryId does not received an id, it should throw an error', async () => {
      (repo.queryId as jest.Mock).mockRejectedValue(new Error('error'));
      await controller.getThingById(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When postThing method is called ', () => {
    test('Then If userId is not given', async () => {
      await controller.postThing(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if userId is given queryId should called res.json ', async () => {
      const req = { body: {}, info: { id: '1' } } as unknown as Request;
      (repoUser.queryId as jest.Mock).mockResolvedValue({ knowledge: [] });
      await controller.postThing(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('When updatething method is called ', () => {
    test('Then If userId is not given', async () => {
      await controller.updateThing(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if userId is given queryId should called res.json', async () => {
      const req = { body: 'js', params: { id: '1' } } as unknown as Request;
      (repo.update as jest.Mock).mockResolvedValue(req);
      await controller.updateThing(req, res, next);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
