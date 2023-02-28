export interface Repo<T> {
  query(): Promise<T[]>;
  queryId(_id: string): Promise<T>;
  create(newThing: Partial<T>): Promise<T>;
  update(newThing: Partial<T>): Promise<T>;
  delete(_id: string): Promise<void>;
}
