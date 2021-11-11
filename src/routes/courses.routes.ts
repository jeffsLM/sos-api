import { query, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateCousesServices from '../services/courses/CreateCoursesService';
import UpdateCoursesService from '../services/courses/UpdateCoursesService';
import GetCoursesService from '../services/courses/GetCoursesService';

const upload = multer(uploadConfig);
const coursesRouter = Router();

coursesRouter.get('/', async (request, response) => {
  try {
    const teacherID = request.query.teacherID as string;

    const courses = await GetCoursesService({ teacherID });

    return response.json(courses);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

coursesRouter.get('/:courseID', async (request, response) => {
  try {
    const { courseID } = request.params;

    const courses = await GetCoursesService({ courseID });

    return response.json(courses);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

coursesRouter.use(ensureAuthenticated);

coursesRouter.post('/', upload.single('image'), async (request, response) => {
  try {
    const { id } = request.user;
    const { title, description, category, status } = request.body;
    const { key } = request.file as Express.Multer.File;

    const courses = await CreateCousesServices({
      id,
      key,
      title,
      description,
      category,
      status,
    });

    return response.json(courses);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

coursesRouter.put('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { courseID, title, description, category, status } = request.body;

    const updated = await UpdateCoursesService({
      id,
      courseID,
      title,
      description,
      category,
      status,
    });

    return response.json({ updated });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default coursesRouter;
