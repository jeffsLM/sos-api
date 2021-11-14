import database from "../../database";

interface Ticket {
  ticket?: string;
  id_mensagem?: string;
  num_func?: string;
  usuario?: string;
  mensagem?: string;
  setor_usuario?: string;
  email?: string;
  prioridade?: string;
  email_copia?: string[];
}


interface Request {
  ticket: number;
}

async function ListTicketService({
  ticket
}: Request): Promise<Ticket> {

  const ticketReturn = await database.many<Ticket[]>(
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

export default ListTicketService;
