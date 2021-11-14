import database from "../../database";

interface Ticket {
  ticket: string;
  num_func?: string;
  usuario?: string;
  mensagem?: string;
  setor?: string;
  email?: string;
  prioridade?: string;
}

interface Request {
  ticket: string;
  num_func: number;
  mensagem: string;
  emailCopia:string[];
}

async function CreateNewStepTicketService({
  ticket,
  num_func,
  mensagem,
  emailCopia,
}: Request): Promise<Ticket> {

  const { id_mensagem } = await database.oneOrNone<Ticket>(
    "select max(id_mensagem)+1 as id_mensagem from SOS_MENSAGEM_TICKET"
  );

  const ticketAberturaMensagem = await database.oneOrNone<Ticket>(
    "insert into SOS_MENSAGEM_TICKET values ($[id_mensagem],$[ticket],$[num_func],$[mensagem],null,now()) RETURNING *",
    {
      id_mensagem,
      ticket,
      num_func,
      mensagem,
    }
  );

  if(!(emailCopia[0] == "")){
    emailCopia.map( async(value,index) => {
        await database.oneOrNone<Ticket>(
          "insert into SOS_TICKET_EMAIL_COPIA values ($[ticket],$[index],$[value])",
          {
            ticket,
            index,
            value,
          }
        );
    })
  }



  const ticketReturn = await database.manyOrNone<Ticket>(
    `select A.ticket,b.id_mensagem,b.num_func,c.nome as usuario,b.mensagem,setor as setor_usuario,email,prioridade
    from SOS_ABERTURA_TICKET A
    inner join SOS_MENSAGEM_TICKET b
    on A.ticket =B.TICKET
    inner join SOS_CAD_USUARIO c
    on a.num_func = c.num_func
    where a.ticket = $[ticket]`,
    {
      ticket,
    }
  );

  return ticketReturn;
}

export default CreateNewStepTicketService;
