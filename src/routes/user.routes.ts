import { Router } from "express";

import CreateUserService from "../services/user/CreateUserService";
import UpdateUserService from "../services/user/UpdateUserService";
import DeleteUserService from "../services/user/DeleteUserService";

const userRouter = Router();

userRouter.post("/create", async (request, response) => {
  try {
    const { nome, setor, email, senha } = request.body;

    const user = await CreateUserService({ nome, setor, email, senha });

    return response.json(user);
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
});

userRouter.post("/update", async (request, response) => {
  try {
    const { num_func, nome, setor, email, senha } = request.body;

    const user = await UpdateUserService({
      num_func,
      nome,
      setor,
      email,
      senha,
    });

    return response.json(user);
  } catch ({ message }) {
    return response.status(400).json({ message: message });
  }
});

userRouter.delete("/delete", async (request, response) => {
  try {
    const { num_func } = request.body;

    const user = await DeleteUserService({ num_func });

    return response.json(user);
  } catch ({ message }) {
    return response.status(400).json({ message: message });
  }
});

export default userRouter;
