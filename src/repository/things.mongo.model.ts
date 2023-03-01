import { model, Schema } from 'mongoose';
import { knowledge } from '../entities/things.models';

const thingSchema = new Schema<knowledge>({
  name: { type: String, require: true },
  side: { type: String, require: true },
  difficulty: { type: Number, require: true, min: 0, max: 10 },
});

thingSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const ThingModel = model('Thing', thingSchema, 'things');
