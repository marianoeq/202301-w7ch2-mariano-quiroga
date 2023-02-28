import fs from 'fs/promises';
import { knowledge } from '../entities/things.models.js';
import { Repo } from './repo.interface.js';
const file = './data/data.json';

export class ThingsFileRepo implements Repo<knowledge> {
  async query(): Promise<knowledge[]> {
    const data: string = await fs.readFile(file, { encoding: 'utf-8' });
    return JSON.parse(data) as knowledge[];
  }

  async queryId(id: number): Promise<knowledge> {
    const data = await fs.readFile(file, 'utf-8');

    const dataParsed: knowledge[] = JSON.parse(data);
    const result = dataParsed.find((item: knowledge) => item.id === id);
    if (!result) {
      throw new Error('ID no found');
    }
    return result;
  }

  async create(newThing: Partial<knowledge>): Promise<knowledge> {
    const data = await fs.readFile(file, 'utf-8');
    const dataParsed: knowledge[] = JSON.parse(data);
    const id = dataParsed.length;
    newThing.id = id + 1;
    const dataAdded = JSON.stringify([...dataParsed, newThing]);
    await fs.writeFile(file, dataAdded, 'utf-8');
    return newThing as knowledge;
  }
  async update(newThing: Partial<knowledge>): Promise<knowledge> {
    if (!newThing.id) throw new Error('Not valid data');
    const data: string = await fs.readFile(file, 'utf-8');
    console.log(data);
    console.log(newThing);
    const dataParsed: knowledge[] = JSON.parse(data);
    let updatedThing: knowledge = {} as knowledge;
    const updatedData = dataParsed.map((item: knowledge) => {
      if (item.id === newThing.id) {
        updatedThing = { ...item, ...newThing };
        return updatedThing;
      }
      return item;
    });
    if (!updatedThing.id) throw new Error('Id not found');
    await fs.writeFile(file, JSON.stringify(updatedData), 'utf-8');
    return updatedThing as knowledge;
  }
  async delete(id: number) {
    const data = await fs.readFile(file, 'utf-8');
    const dataParsed = JSON.parse(data);
    const dataFiltered = dataParsed.filter((item: knowledge) => item.id !== id);
    const finalData = JSON.stringify(dataFiltered);
    console.log(finalData);
    return fs.writeFile(file, finalData, 'utf-8');
  }
}
