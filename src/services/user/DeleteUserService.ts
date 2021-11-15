import database from '../../database';
import User from '../../models/User';

type Request = {
  num_func: string;
}

type Return ={
  message: string;
}

async function DeleteUserService({
  num_func

}: Request): Promise<User> {

  if(!num_func){
    throw new Error('código de funcionario não informado');
  }

  const updateReturn = await database.oneOrNone(
    `delete FROM  SOS_CAD_USUARIO where num_func = $[num_func]
      `,
    {
      num_func,
    },
  );

  const dataReturn=<Return> {
    message: "usuario removido"
  }
  return dataReturn as any;

}

export default DeleteUserService;
