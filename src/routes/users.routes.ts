import { Router } from 'express';

import CreateUsersService from '../services/users/CreateUsersService';
import UpdateUsersService from '../services/users/UpdateUsersService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password, teacher } = request.body;

    const user = await CreateUsersService({
      name,
      email,
      password,
      teacher,
    });

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.use(ensureAuthenticated);

usersRouter.put('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { name, password } = request.body;

    const updated = await UpdateUsersService({ id, name, password });

    return response.json({ updated });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
