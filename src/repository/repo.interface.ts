export interface Repo<T> {
  query(): Promise<T[]>;
  queryId(_id: number): Promise<T>;
  create(newThing: Partial<T>): Promise<T>;
  update(newThing: Partial<T>): Promise<T>;
  delete(_id: number): Promise<void>;
}
