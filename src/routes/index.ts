import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import coursesRouter from './courses.routes';
import moduleRouter from './module.routes';
import studentRouter from './student.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/courses', coursesRouter);
routes.use('/modules', moduleRouter);
routes.use('/students', studentRouter);

export default routes;
