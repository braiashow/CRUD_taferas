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
static atualizarParcial(codigo, nome, descricao, responsavel, dataCriacao, prazo, status, prioridade) {
  tarefa.nome = nome || tarefa.nome;
  tarefa.descricao = descricao || tarefa.descricao;
  tarefa.responsavel = responsavel || tarefa.responsavel;
  tarefa.dataCriacao = dataCriacao || tarefa.dataCriacao;
  tarefa.prazo = prazo || tarefa.prazo;
  tarefa.status = status || tarefa.status;
  tarefa.prioridade = prioridade || tarefa.prioridade;
  return tarefa;
}
static excluirTodos(req, res) {
    try {
        TarefaModel.excluirTodos()
        res.status(200).json({ mensagem: "Tarefa excluída com sucesso." });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir tarefa." });
    }
}
static excluirPorCodigo(req, res) {
  try {
    const codigo = req.params.codigo;
    TarefaModel.excluirPorCodigo()
    res.status(200).json({ mensagem: "Tarefa excluída com sucesso." })
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao excluir tarefa." })
  }
}
}
export default TarefaController