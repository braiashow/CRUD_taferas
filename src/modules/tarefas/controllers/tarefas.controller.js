import TarefaModel from "../models/tarefas.model.js";

class TarefaController {
  static cadastrar(req, res) {
    try {
     const {
        titulo, 
        descricao,
        codigo,
        responsavel,
        dataCriacao,
        prazo,
        status,
        prioridade,
      } = req.body;
      if (
        !titulo ||
        !descricao ||
        !codigo ||
        !responsavel ||
        !dataCriacao ||
        !prazo ||
        !status ||
        !prioridade
      ) {
        return res
          .status(400)
          .json({ mensagem: "Todos os campos são obrigatórios." });
      }
      TarefaModel.cadastrar(
        titulo,
        descricao,
        codigo,
        responsavel,
        dataCriacao,
        prazo,
        status,
        prioridade,
      );
      res.status(201).json({ mensagem: "Tarefa cadastrada com sucesso." });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  }
  static listarTodos(req, res) {
    try {
      const tarefa = TarefaModel.listarTodos();
      if (tarefa.length === 0) {
        return res.status(200).json({ mensagem: "Nenhuma tarefa encontrada." });
      }
    res.status(200).json(tarefa);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}
static listarPorCodigo(req, res) {
    try {
      const codigo = req.params.codigo;
      const tarefa = TarefaModel.listarPorCodigo(codigo);
      if (!tarefa) {
        return res.status(200).json({ mensagem: "Nenhuma tarefa encontrada para o codigo especificado." });
      }
      res.status(200).json(tarefa);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  }
static atualizarTotal(req, res) { 
    try {
        const codigo = req.params.codigo;
        const { novoTitulo, novoDescricao, novoResponsavel, novodataCriacao, novoPrazo, novoStatus, novoPrioridade } = req.body;
        const tarefa = TarefaModel.atualizarTotal(codigo, novoTitulo, novoDescricao, novoResponsavel, novodataCriacao, novoPrazo, novoStatus, novoPrioridade)
        res.status(200).json(tarefa)
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar tarefa." });
    }

}
static atualizarParcial(req, res) {
try {
    const codigo = req.params.codigo;
    const { novoTitulo, novoDescricao, novoResponsavel, novodataCriacao, novoPrazo, novoStatus, novoPrioridade } = req.body;
    const tarefa = TarefaModel.atualizarParcial(codigo, novoTitulo, novoDescricao, novoResponsavel, novodataCriacao, novoPrazo, novoStatus, novoPrioridade)
    res.status(200).json(tarefa)
} catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar tarefa." });
        }
    }
}

