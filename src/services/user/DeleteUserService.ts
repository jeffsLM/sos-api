import database from '../../database';
import User from '../../models/User';

async function DeleteUserService({
  num_func

}: string): Promise<User> {

  if(!num_func){
    throw new Error('código de funcionario não informado');
  }

  const updateReturn = await database.oneOrNone<User>(
    `delete FROM  SOS_CAD_USUARIO where num_func = $[num_func]
      `,
    {
      num_func,
    },
  );

  const dataReturn = {
    message: "usuario removido"
  }
  return dataReturn;

}

export default DeleteUserService;
