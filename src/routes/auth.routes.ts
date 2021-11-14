import { Router } from 'express';

import {LoginService} from '../services/LoginService';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  try {
    const { num_func,senha } = request.body;
    const user = await LoginService({num_func,senha});

    return response.json(user);
  } catch (e:any) {
    return response.status(401).json({ message: e.message });
  }
});

export default authRouter;
