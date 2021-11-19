import express from 'express';
import cors from 'cors';
import routes from './routes';
import config from './config'

const app = express();

app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(routes);

app.listen(config.port, () => {
  console.log(`Server listen on port ${config.port}`);
});
