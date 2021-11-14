import pgPromise from 'pg-promise';
import config from '../config';

const pg = pgPromise();

const database = pg({ connectionString: config.url, ssl: true });

export default database;
