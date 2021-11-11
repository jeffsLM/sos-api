import database from '../../database';
import Courses from '../../models/Courses';

interface Request {
  id: string;
}
async function GetStudetentCourseService({ id }: Request): Promise<Courses[]> {
  const courses = await database.query<Courses[]>(
    `SELECT 
      C.ID,C.USER_ID, C.TITLE, C.DESCRIPTION, C.CATEGORY, C.STATUS, C.CREATED_AT,C.UPDATED_AT, CONCAT('https://recipes-share.s3.sa-east-1.amazonaws.com/', C.IMAGE) as IMAGE 
        FROM STUDENTS S 
          INNER JOIN COURSES C ON S.COURSE_ID = C.ID
            WHERE S.USER_ID = $[id] AND STATUS = 'published'`,
    {
      id,
    },
  );

  return courses;
}

export default GetStudetentCourseService;
