import mongoose from 'mongoose';
import { config } from '../config.js';

const { user, password, dbName, cluster } = config;
export const dbConnect = () => {
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
