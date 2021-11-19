import { Router } from 'express';

import authRouter from './auth.routes';
import userRouter from './user.routes';
import ticketRouter from './tickets.routes';
import patientRecordsRouter from './patientRecords.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/user', userRouter);
routes.use('/ticket', ticketRouter);


export default routes;
