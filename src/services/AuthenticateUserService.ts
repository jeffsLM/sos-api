import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import database from '../database';

import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

async function AuthenticateUserService({
  email,
  password,
}: Request): Promise<Response> {
  const user = await database.oneOrNone<User>(
    'SELECT * FROM USERS WHERE EMAIL = $[email]',
    {
      email,
    },
  );

  if (!user) {
    throw new Error('Incorrect email/password combination.');
  }

  const passwordMatched = await compare(password, user.password as string);

  if (!passwordMatched) {
    throw new Error('Incorrect email/password combination.');
  }

  const { secret, expiresIn } = authConfig.jwt;

  const token = sign({}, secret, {
    subject: user.id,
    expiresIn,
  });

  delete user.password;

  return { user, token };
}

export default AuthenticateUserService;
