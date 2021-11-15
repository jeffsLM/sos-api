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
  num_func: number;
  prioridade: string;
  mensagem: string;
  emailCopia:string[];
}

interface ticketMax { ticket:string; }

interface  MaxId {
  id_mensagem :string
}


async function CreateTicketService({
  num_func,
  prioridade,
  mensagem,
  emailCopia,
}: Request): Promise<Ticket> {
  const  maxTicket  = await database.oneOrNone<ticketMax>(
    "select max(ticket)+1 as ticket from SOS_ABERTURA_TICKET"
  );

  const ticket = maxTicket?.ticket

  const ticketAbertura = await database.oneOrNone<Ticket>(
    "insert into SOS_ABERTURA_TICKET values($[ticket],$[num_func],$[prioridade],now(),null,now()) RETURNING *",
    {
      ticket,
      num_func,
      prioridade,
    }
  );

  const max_mensagem = await database.oneOrNone<MaxId>(
    "select max(id_mensagem)+1 as id_mensagem from SOS_MENSAGEM_TICKET"
  );

  const id_mensagem = max_mensagem?.id_mensagem

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



  const ticketReturn = await database.one<Ticket>(
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

export default CreateTicketService;
