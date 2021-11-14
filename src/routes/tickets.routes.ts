import { Router } from "express";

import CreateTicketService from "../services/ticket/CreateTicketService";
import ListTicketService from "../services/ticket/ListTicketService";
import UpdateTicketService from "../services/ticket/UpdateTicketService";
import CreateNewStepTicketService from "../services/ticket/CreateNewStepTicketService";


const userRouter = Router();

userRouter.get("/list", async (request, response) => {
  try {
    const { ticket } = request.body;

    const user = await ListTicketService({ ticket });

    return response.json(user);
  } catch ({ message }) {
    return response.status(400).json({ message: message });
  }
});

userRouter.post("/update", async (request, response) => {
  try {
    const { ticket,prioridade,encerramento } = request.body;

    const user = await UpdateTicketService({ ticket,prioridade,encerramento });

    return response.json(ticket);
  } catch ({ message }) {
    return response.status(400).json({ message: message });
  }
});

userRouter.post("/create", async (request, response) => {
  try {
    const { num_func, prioridade, mensagem, emailCopia } = request.body;

    const user = await CreateTicketService({
      num_func,
      prioridade,
      mensagem,
      emailCopia,
    });

    return response.json(user);
  } catch ({ message }) {
    return response.status(400).json({ message: message });
  }
});

userRouter.post("/step", async (request, response) => {
  try {
    const { ticket,num_func,emailCopia,mensagem } = request.body;

    const user = await CreateNewStepTicketService({
      num_func,ticket,mensagem,emailCopia
    });

    return response.json(user);
  } catch ({ message }) {
    return response.status(400).json({ message: message });
  }
});

userRouter.post("/create", async (request, response) => {
  try {
    const { num_func, prioridade, mensagem, emailCopia } = request.body;

    const user = await CreateTicketService({
      num_func,
      prioridade,
      mensagem,
      emailCopia,
    });

    return response.json(user);
  } catch ({ message }) {
    return response.status(400).json({ message: message });
  }
});

export default userRouter;
