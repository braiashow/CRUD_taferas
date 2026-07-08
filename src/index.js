import express from "express";
import dotenv from "dotenv";
import router from "./modules/tarefas/routes/tarefas.route.js";

dotenv.config();
const app = express();

app.use(express.json());

const porta = process.env.PORTA;

const tarefas = [];
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
// Registrando as rotas do módulo de tarefas
app.use("/tarefas", router);
