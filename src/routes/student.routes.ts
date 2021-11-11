import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RegisterStudentCourseService from '../services/students/RegisterStudentCourseService';
import GetStudetentCourseService from '../services/students/GetStudetentCourseService';

const studentRouter = Router();

studentRouter.use(ensureAuthenticated);

studentRouter.get('/', async (request, response) => {
  try {
    const { id } = request.user;

    const courses = await GetStudetentCourseService({ id });

    return response.json(courses);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

studentRouter.post('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { course_id, module_id } = request.body;

    const student = await RegisterStudentCourseService({
      id,
      course_id,
      module_id,
    });

    return response.json(student);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

export default studentRouter;
