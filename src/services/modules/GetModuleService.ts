import database from '../../database';

interface Request {
  course_id: string;
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

async function GetModuleService({ course_id }: Request): Promise<Response[]> {
  const module = await database.query<Response[]>(
    'SELECT * FROM MODULES WHERE COURSE_ID = $[course_id]',
    {
      course_id,
    },
  );

  return module;
}

export default GetModuleService;
