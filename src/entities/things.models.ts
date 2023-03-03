import { User } from './user.model';

export type knowledge = {
  id: string;
  name: string;
  side: string;
  difficulty: number;
  owner: User;
};

// Owner representa al usuario que saben matematica por ej
