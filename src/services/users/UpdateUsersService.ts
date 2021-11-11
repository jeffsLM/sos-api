import { hash } from 'bcryptjs';

import database from '../../database';

interface Request {
  id: string;
  name: string;
  password: string;
}

async function UpdateUsersServices({ id, name, password }: Request) {
  const hashedPassword = await hash(password, 8);

  const { rowCount } = await database.result(
    'UPDATE USERS SET NAME = $[name], PASSWORD = $[password], UPDATED_AT = NOW() WHERE id = $[id]',
    {
      name,
      id,
      password: hashedPassword,
    },
  );

  return !!rowCount;
}

export default UpdateUsersServices;
