import database from "../database";
import User from "../models/User";

interface Request {
  email: string;
  senha: string;
}

export async function LoginService({ email,senha }: Request): Promise<User> {
  const user = await database.oneOrNone<User>(
    "SELECT * FROM sos_cad_usuario WHERE email = $[email] and senha=$[senha]",
    {
      email,
      senha
    }
  );

  if (!user) {
    throw new Error("Usuário Inválido.");
  }

  return user;
}

