import 'reflect-metadata';
import express from 'express';
import routes from './routes';

// aqui só estamos carregando o arquivo, do qual não exportamos nada.
import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
