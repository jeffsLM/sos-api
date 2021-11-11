import express from 'express';
import cors from 'cors';
import routes from './routes';
import config from './config'

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(config.port, () => {
  console.log(`Server listen on port 3333`);
});
