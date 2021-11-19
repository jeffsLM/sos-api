import database from "../../database";
import User from "../../models/User";

interface Request {
  nome: string;
  setor: string;
  email: string;
  senha: string;
}

async function CreateUserService({
  nome,
  setor,
  email,
  senha,
}: Request): Promise<User> {
  const userExists = await database.oneOrNone<User>(
    "SELECT * FROM SOS_CAD_USUARIO where email = $[email]",
    {
      email,
    }
  );

  if (userExists) {
    throw new Error("usuario já cadastrado");
  }

  const  SOS_CAD_USUARIO  = await database.oneOrNone<User>(
    "select max(num_func)+1 as num_func from SOS_CAD_USUARIO"
  );
  let {num_func}:any = SOS_CAD_USUARIO

  const user = await database.one<User>(
    "INSERT INTO SOS_CAD_USUARIO VALUES($[num_func], $[nome],$[setor],$[email],NOW(),$[senha] ) RETURNING *",
    {
      num_func,
      nome,
      setor,
      email,
      senha,
    }
  );

  return user;
}

export default CreateUserService;
