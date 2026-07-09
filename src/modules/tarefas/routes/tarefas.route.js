import express from "express";
import TarefaController from "../controllers/tarefas.controller.js";

const router = express.Router();

router.get("/listar", TarefaController.listarTodos);

router.post("/cadastrar", TarefaController.cadastrar);

router.put("/atualizar/total/:codigo", TarefaController.atualizarTotal);

router.patch("/atualizar/parcial/:codigo", TarefaController.atualizarParcial);

router.delete("/excluir/:codigo", TarefaController.excluirPorCodigo);

router.delete("/excluir", TarefaController.excluirTodos);

export default router;
