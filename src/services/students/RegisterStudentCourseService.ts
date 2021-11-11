import database from '../../database';

interface Request {
  id: string;
  course_id: string;
  module_id: string;
}

interface Response {
  id: string;
  course_id: string;
  module_id: string;
  user_id: string;
  complete: boolean;
  created_at: string;
  updated_at: string;
}

async function RegisterStudentCourseService({
  id,
  course_id,
  module_id,
}: Request): Promise<Response> {
  const checkModule = await database.oneOrNone<Response>(
    `SELECT * FROM STUDENTS WHERE COURSE_ID = $[course_id] AND MODULE_ID = module_id AND USER_ID = $[id]`,
    {
      course_id,
      module_id,
      id,
    },
  );

  if (!!checkModule) {
    throw new Error('Module has already been registered');
  }

  const student = await database.one<Response>(
    `INSERT INTO STUDENTS VALUES(DEFAULT, $[course_id], $[module_id], $[id], false) returning *`,
    {
      course_id,
      module_id,
      id,
    },
  );

  return student;
}

export default RegisterStudentCourseService;
