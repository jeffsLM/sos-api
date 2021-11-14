import database from "../database";
import User from "../models/User";

interface Request {
  num_func: number;
  senha: string;
}

export async function LoginService({ num_func,senha }: Request): Promise<User> {
  const user = await database.oneOrNone<User>(
    "SELECT * FROM sos_cad_usuario WHERE NUM_FUNC = $[num_func] and senha=$[senha]",
    {
      num_func,
      senha
    }
  );

  if (!user) {
    throw new Error("Usuário Inválido.");
  }

  return user;
}

