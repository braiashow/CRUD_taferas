import TarefaModel from "../models/tarefas.model.js";

class TarefaController {
  static async cadastrar(req, res) {
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
        return res.status(400).json({
          mensagem: "Todos os campos são obrigatórios.",
        });
      }

      const tarefa = await TarefaModel.cadastrar(
        titulo,
        descricao,
        codigo,
        responsavel,
        dataCriacao,
        prazo,
        status,
        prioridade
      );

      return res.status(201).json({
        mensagem: "Tarefa cadastrada com sucesso.",
        tarefa,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro interno do servidor.",
        erro: error.message,
      });
    }
  }

  static async listarTodos(req, res) {
    try {
      const tarefas = await TarefaModel.listarTodos();

      if (tarefas.length === 0) {
        return res.status(200).json({
          mensagem: "Nenhuma tarefa encontrada.",
          tarefas: [],
        });
      }

      return res.status(200).json({
        quantidade: tarefas.length,
        tarefas,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao listar as tarefas.",
        erro: error.message,
      });
    }
  }

  static async listarPorCodigo(req, res) {
    try {
      const { codigo } = req.params;

      const tarefa = await TarefaModel.listarPorCodigo(codigo);

      if (!tarefa) {
        return res.status(404).json({
          mensagem:
            "Nenhuma tarefa encontrada para o código especificado.",
        });
      }

      return res.status(200).json({
        tarefa,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao buscar a tarefa.",
        erro: error.message,
      });
    }
  }

  static async atualizarTotal(req, res) {
    try {
      const { codigo } = req.params;

      const {
        titulo,
        descricao,
        responsavel,
        dataCriacao,
        prazo,
        status,
        prioridade,
      } = req.body;

      if (
        !titulo ||
        !descricao ||
        !responsavel ||
        !dataCriacao ||
        !prazo ||
        !status ||
        !prioridade
      ) {
        return res.status(400).json({
          mensagem:
            "Todos os campos são obrigatórios para a atualização total.",
        });
      }

      const tarefa = await TarefaModel.atualizar(
        codigo,
        titulo,
        descricao,
        responsavel,
        dataCriacao,
        prazo,
        status,
        prioridade
      );

      if (!tarefa) {
        return res.status(404).json({
          mensagem: "Tarefa não encontrada.",
        });
      }

      return res.status(200).json({
        mensagem: "Tarefa atualizada com sucesso.",
        tarefa,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao atualizar a tarefa.",
        erro: error.message,
      });
    }
  }

  static async atualizarParcial(req, res) {
    try {
      const { codigo } = req.params;

      const {
        titulo,
        descricao,
        responsavel,
        dataCriacao,
        prazo,
        status,
        prioridade,
      } = req.body;

      const tarefa = await TarefaModel.atualizarParcial(
        codigo,
        titulo,
        descricao,
        responsavel,
        dataCriacao,
        prazo,
        status,
        prioridade
      );

      if (!tarefa) {
        return res.status(404).json({
          mensagem: "Tarefa não encontrada.",
        });
      }

      return res.status(200).json({
        mensagem: "Tarefa atualizada parcialmente com sucesso.",
        tarefa,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao atualizar parcialmente a tarefa.",
        erro: error.message,
      });
    }
  }

  static async excluirPorCodigo(req, res) {
    try {
      const { codigo } = req.params;

      const tarefa = await TarefaModel.excluirPorCodigo(codigo);

      if (!tarefa) {
        return res.status(404).json({
          mensagem: "Tarefa não encontrada.",
        });
      }

      return res.status(200).json({
        mensagem: "Tarefa excluída com sucesso.",
        tarefa,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao excluir a tarefa.",
        erro: error.message,
      });
    }
  }

  static async excluirTodos(req, res) {
    try {
      const tarefasExcluidas =
        await TarefaModel.excluirTodos();

      if (tarefasExcluidas.length === 0) {
        return res.status(200).json({
          mensagem: "Não existem tarefas para excluir.",
          tarefas: [],
        });
      }

      return res.status(200).json({
        mensagem: "Todas as tarefas foram excluídas com sucesso.",
        quantidade: tarefasExcluidas.length,
        tarefas: tarefasExcluidas,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao excluir as tarefas.",
        erro: error.message,
      });
    }
  }
}

export default TarefaController;
