import { Router } from 'express';

import {LoginService} from '../services/LoginService';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  try {
    const { email,senha } = request.body;
    const user = await LoginService({email,senha});

    return response.json(user);
  } catch (e) {
    return response.status(401).json({ message: e.message });
  }
});

export default authRouter;
