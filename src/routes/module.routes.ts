import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateModulesService from '../services/modules/CreateModulesService';
import GetModuleService from '../services/modules/GetModuleService';

const moduleRouter = Router();

moduleRouter.get('/:course_id', async (request, response) => {
  try {
    const { course_id } = request.params;

    const modules = await GetModuleService({ course_id });

    return response.json(modules);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

moduleRouter.use(ensureAuthenticated);

moduleRouter.post('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { course_id, title, video, content } = request.body;
    const module = await CreateModulesService({
      id,
      course_id,
      title,
      video,
      content,
    });
    return response.json(module);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

export default moduleRouter;
