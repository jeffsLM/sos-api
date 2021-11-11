import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const { user, token } = await AuthenticateUserService({ email, password });

    return response.json({ user, token });
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

export default sessionsRouter;
