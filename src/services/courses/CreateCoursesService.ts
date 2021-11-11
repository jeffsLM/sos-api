import database from '../../database';
import Courses from '../../models/Courses';

interface Request {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  key: string;
}

async function CreateCousesServices({
  id,
  title,
  description,
  category,
  status,
  key,
}: Request): Promise<Courses> {
  const courses = await database.one<Courses>(
    'INSERT INTO COURSES VALUES(DEFAULT, $[id], $[title], $[description], $[category], $[status],DEFAULT,DEFAULT,$[key]) returning *',
    {
      id,
      title,
      description,
      category,
      status,
      key,
    },
  );

  return courses;
}

export default CreateCousesServices;
