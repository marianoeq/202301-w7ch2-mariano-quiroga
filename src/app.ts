import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { thingsRouter } from './router/things.router.js';

export const app = express();

app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use((_req, _res, next) => {
  console.log();
  ('soy un middleware');
  next();
});
//Si tuviera mas rutas, tengo que crear otra linea como la de abajo pero con el nombre de la nueva ruta y luego el nombre del archivo del router.
app.use('/things', thingsRouter);

app.get('/', (req, res) => {
  res.json({ things: '/things' });
});
app.get('/:id', (req, res) => {
  res.send('' + req.params.id);
});
app.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
app.patch('/');
app.patch('/:id');
app.delete('/:id');

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log('soy el middleware de errores');

  res.json([]);
});
