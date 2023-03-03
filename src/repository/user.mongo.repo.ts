/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../entities/user.model.js';
import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface.js';
import { UserModel } from './user.mongo.model.js';

export class UserMongoRepo implements Repo<User> {
  async query(): Promise<User[]> {
    return [];
  }

  async queryId(id: User['id']): Promise<User> {
    const data = await UserModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'id not found');
    return data;
  }

  async create(newUser: Partial<User>): Promise<User> {
    const data = await UserModel.create(newUser);
    if (!data) throw new HTTPError(404, 'Not found', 'id not found');
    return data;
  }

  async update(newUser: Partial<User>): Promise<User> {
    const data = await UserModel.findByIdAndUpdate(newUser);
    if (!data) throw new HTTPError(404, 'Not found', 'id not found');
    return data;
  }

  async delete(id: string): Promise<void> {
    const data = await UserModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: ID not found '
      );
  }

  async search(query: { key: string; value: unknown }) {
    const data = await UserModel.find({ [query.key]: query.value });
    return data;
  }
}
