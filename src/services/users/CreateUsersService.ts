import { hash } from 'bcryptjs';

import database from '../../database';
import User from '../../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  teacher: boolean;
}

async function CreateUsersService({
  name,
  email,
  password,
  teacher,
}: Request): Promise<User> {
  const checkUserExists = await database.oneOrNone<User>(
    'SELECT ID FROM USERS WHERE EMAIL = $[email]',
    {
      email,
    },
  );

  if (checkUserExists) {
    throw new Error('Email address already used');
  }

  const hashedPassword = await hash(password, 8);

  const user = await database.one<User>(
    'INSERT INTO USERS VALUES(DEFAULT, $[name], $[email], $[password], $[teacher]) returning *',
    {
      name,
      email,
      password: hashedPassword,
      teacher,
    },
  );

  delete user.password;

  return user;
}

export default CreateUsersService;
