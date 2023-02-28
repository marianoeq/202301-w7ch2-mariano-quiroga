import { idText } from 'typescript';
import { knowledge } from '../entities/things.models';
import { Repo } from './repo.interface';
import { ThingModel } from './things.mongo.model';

export class ThingsMongoRepo implements Repo<knowledge> {
  async query(): Promise<knowledge[]> {
    const data = await ThingModel.find();
    if (!data) throw new Error('Info not found');

    return data;
  }

  async queryId(id: Partial<knowledge['id']>): Promise<knowledge> {
    const data = await ThingModel.findById(id);
    if (!data) throw new Error('ID not found');
    return data;
  }

  async create(newThing: Partial<knowledge>): Promise<knowledge> {
    const data = await ThingModel.create(newThing);
    if (!data) throw new Error('Can not send data');
    return data;
  }

  async update(newThing: Partial<knowledge>): Promise<knowledge> {
    const data = await ThingModel.findByIdAndUpdate(newThing);
    if (!data) throw new Error('ID not found');
    return data;
  }

  async delete(id: number): Promise<void> {
    ThingModel.findByIdAndDelete(id);
  }
}
