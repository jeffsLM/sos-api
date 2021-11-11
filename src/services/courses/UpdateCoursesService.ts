import database from '../../database';

interface Request {
  id: string;
  courseID: string;
  title: string;
  description: string;
  category: string;
  status: string;
}

async function UpdateCoursesService({
  id,
  courseID,
  title,
  description,
  category,
  status,
}: Request) {
  const { rowCount } = await database.result(
    'UPDATE COURSES SET TITLE = $[title], DESCRIPTION = $[description], CATEGORY = $[category], STATUS = $[status], UPDATED_AT = now() WHERE ID = $[courseID] AND USER_ID = $[id]',
    {
      id,
      courseID,
      title,
      description,
      category,
      status,
    },
  );

  return !!rowCount;
}

export default UpdateCoursesService;
