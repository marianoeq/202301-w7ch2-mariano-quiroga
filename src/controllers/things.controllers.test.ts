import { Request, Response, NextFunction } from 'express';
import { ThingsFileRepo } from '../repository/things.file.repo';
import { ThingsControllers } from './things.controllers';

describe('Given ThingsControllers', () => {
  const repo: ThingsFileRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const req = { body: {}, params: { id: '' } } as unknown as Request;
  const res = { json: jest.fn() } as unknown as Response;
  const next = jest.fn();

  const controller = new ThingsControllers(repo);

  describe('getAll', () => {
    test('If there are no errors', async () => {
      await controller.getAllThings(req, res, next);
      expect(repo.query).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
    test('If there are errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error('error'));
      await controller.getAllThings(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
