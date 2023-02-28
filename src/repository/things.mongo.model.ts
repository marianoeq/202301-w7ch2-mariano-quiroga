import { model, Schema } from 'mongoose';
import { knowledge } from '../entities/things.models';

const thingSchema = new Schema<knowledge>({
  name: { type: String, require: true, unique: true },
  side: { type: String, require: true, unique: true },
  difficulty: { type: Number, require: true, unique: true },
});

export const ThingModel = model('Thing', thingSchema, 'things');
