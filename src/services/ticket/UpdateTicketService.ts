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
  prioridade:number;
  encerramento:boolean;
}

async function UpdateTicketService({
  ticket,
  prioridade,
  encerramento,
}: Request): Promise<Ticket> {

  const ticketReturn = await database.many<Ticket[]>(
    ` update SOS_ABERTURA_TICKET set prioridade = $[prioridade], data_encerramento = ${encerramento?"now()": "null"  }
    where ticket = $[ticket] RETURNING *`,
    {
      ticket,
      prioridade
    }
  );


  return ticketReturn as any;
}

export default UpdateTicketService;
