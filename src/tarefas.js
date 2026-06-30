import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const porta = process.env.PORTA;


const tarefas = [];

app.get("/tarefas", (req, res) => {
  try{
    if (tarefas.length === 0) {
      return res.status(404).json({ message: "Nenhuma foi cadastrada." });
  }
  res.status(200).json(tarefas);
} catch (error) {
  res.status(500).json({ message: "Erro interno do servidor." });
}});

app.post("/cadastrar", (req, res) => {
  try {
    const { titulo, descricao, codigo, responsavel, dataCriacao, prazo, status, prioridade,} = req.body;
    if (!titulo || !descricao || !codigo || !responsavel || !dataCriacao || !prazo || !status || !prioridade) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }
    const dados = {
      titulo, descricao, codigo, responsavel, dataCriacao, prazo, status, prioridade,
    };
    tarefas.push(dados);
    res.status(201).json({ message: "Tarefa cadastrada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});
app.patch("/atualizar/:codigo", (req, res) => {
  try {
    const codigo = req.params.codigo;
    const Tarefa = tarefas.find((tarefa) => tarefa.codigo === codigo);
    if (!Tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }
    const { novotitulo, novodescricao, novoresponsavel, novodataCriacao, novoprazo, novostatus, novoprioridade } = req.body;
    if (!novotitulo || !novodescricao || !novoresponsavel || !novodataCriacao || !novoprazo || !novostatus || !novoprioridade) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }
    Tarefa.titulo = novotitulo;
    Tarefa.descricao = novodescricao;
    Tarefa.responsavel = novoresponsavel;
    Tarefa.dataCriacao = novodataCriacao;
    Tarefa.prazo = novoprazo;
    Tarefa.status = novostatus;
    Tarefa.prioridade = novoprioridade;
    res.status(200).json({ message: "Tarefa atualizada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});
app

app.delete("/excluir/:codigo", (req, res) => {
  try {
    const codigo = req.params.codigo;
    const tarefa = tarefas.find((tarefa) => tarefa.codigo === codigo);
    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }
    tarefas.splice(tarefas.indexOf(tarefa), 1);
    res.status(200).json({ message: "Tarefa excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }

});
app.delete("/excluir/todos", (req, res) => {
  try {
    tarefas.length = 0;
    res.status(200).json({ message: "Todas as tarefas foram excluídas com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});