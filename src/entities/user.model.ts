import { knowledge } from './things.models';

export type User = {
  id: string;
  email: string;
  password: string;
  knowledge: knowledge[];
};
// Knowledge aca representa la cantidad de conocimientos que tiene un solo usuario
