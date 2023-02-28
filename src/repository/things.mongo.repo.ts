import { knowledge } from '../entities/things.models.js';
import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface';
import { ThingModel } from './things.mongo.model.js';

export class ThingsMongoRepo implements Repo<knowledge> {
  async query(): Promise<knowledge[]> {
    const data = await ThingModel.find();
    if (!data) throw new HTTPError(404, 'Not found', 'id not found');

    return data;
  }

  async queryId(id: Partial<knowledge['id']>): Promise<knowledge> {
    const data = await ThingModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'id not found');
    return data;
  }

  async create(newThing: Partial<knowledge>): Promise<knowledge> {
    const data = await ThingModel.create(newThing);
    if (!data) throw new HTTPError(404, 'Not found', 'id not found');
    return data;
  }

  async update(newThing: Partial<knowledge>): Promise<knowledge> {
    const data = await ThingModel.findByIdAndUpdate(newThing);
    if (!data) throw new HTTPError(404, 'Not found', 'id not found');
    return data;
  }

  async delete(id: string): Promise<void> {
    const data = await ThingModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: ID not found '
      );
  }
}
