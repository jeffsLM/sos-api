import Courses from '../../models/Courses';
import database from '../../database';

interface Request {
  courseID?: string;
  teacherID?: string;
}

async function GetCoursesServices({
  courseID = 'All',
  teacherID,
}: Request): Promise<Courses[] | Courses | null> {
  if (teacherID) {
    const courses = await database.query<Courses[]>(
      `SELECT ID,USER_ID, TITLE, DESCRIPTION, CATEGORY, STATUS, CREATED_AT,UPDATED_AT, CONCAT('https://recipes-share.s3.sa-east-1.amazonaws.com/', IMAGE) as IMAGE FROM COURSES WHERE USER_ID = $[teacherID]`,
      {
        teacherID,
      },
    );
    return courses;
  }
  if (courseID === 'All') {
    const courses = await database.query<Courses[]>(
      `SELECT ID,USER_ID, TITLE, DESCRIPTION, CATEGORY, STATUS, CREATED_AT,UPDATED_AT, CONCAT('https://recipes-share.s3.sa-east-1.amazonaws.com/', IMAGE) as IMAGE FROM COURSES WHERE STATUS = 'published'`,
    );
    return courses;
  }
  const courses = await database.oneOrNone<Courses>(
    `SELECT ID,USER_ID, TITLE, DESCRIPTION, CATEGORY, STATUS, CREATED_AT,UPDATED_AT, CONCAT('https://recipes-share.s3.sa-east-1.amazonaws.com/', IMAGE) as IMAGE FROM COURSES WHERE ID = $[courseID] AND STATUS = 'published'`,
    { courseID },
  );
  return courses;
}

export default GetCoursesServices;
