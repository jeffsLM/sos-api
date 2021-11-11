import database from '../../database';
import Courses from '../../models/Courses';

interface Request {
  id: string;
  course_id: string;
  title: string;
  video: string;
  content: string;
}

interface Response {
  id: string;
  course_id: string;
  title: string;
  video: string;
  content: string;
  created_at: string;
  updated_at: string;
}

async function CreateModulesServices({
  course_id,
  title,
  video,
  content,
  id,
}: Request): Promise<Response> {
  const checkUserAccess = await database.oneOrNone<Courses>(
    'select *from courses where id = $[course_id] and user_id = $[id]',
    {
      id,
      course_id,
    },
  );

  if (!checkUserAccess) {
    throw new Error("Doesn't have access to this course");
  }
  const module = await database.one<Response>(
    'INSERT INTO MODULES VALUES(DEFAULT, $[course_id], $[title], $[video], $[content]) returning *',
    {
      course_id,
      title,
      video,
      content,
    },
  );

  return module;
}

export default CreateModulesServices;
