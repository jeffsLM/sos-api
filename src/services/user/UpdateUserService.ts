import database from '../../database';
import User from '../../models/User';

async function UpdateUserService({
  num_func,
  nome,
  setor,
  email,
  senha
}: User): Promise<User> {

  if(!num_func){
    throw new Error('código de funcionario não informado');
  }

  const updateReturn = await database.oneOrNone<User>(
    `update SOS_CAD_USUARIO
      set nome = $[nome]
          ,setor = $[setor]
          ,email = $[email]
          ,senha  = $[senha]
      where num_func = $[num_func] RETURNING *`,
    {
      num_func,
      nome,
      setor,
      email,
      senha
    },
  );

  return updateReturn;
}

export default UpdateUserService;
