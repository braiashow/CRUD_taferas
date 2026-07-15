import conexao from "../../../config/datase.js";

class TarefaModel {
  constructor(
    titulo,
    descricao,
    codigo,
    responsavel,
    dataCriacao,
    prazo,
    status,
    prioridade,
  ) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.codigo = codigo;
    this.responsavel = responsavel;
    this.dataCriacao = dataCriacao;
    this.prazo = prazo;
    this.status = status;
    this.prioridade = prioridade;
  }

  static async cadastrar(
    titulo,
    descricao,
    codigo,
    responsavel,
    dataCriacao,
    prazo,
    status,
    prioridade,
  ) {
    const dados = [
      titulo,
      descricao,
      codigo,
      responsavel,
      dataCriacao,
      prazo,
      status,
      prioridade,
    ];

    const query = `
      INSERT INTO tarefa (
        titulo,
        descricao,
        codigo,
        responsavel,
        dataCriacao,
        prazo,
        status,
        prioridade)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const resultado = await conexao.query(query, dados);

    return resultado.rows;
  }

  static async listarTodos() {
    const query = `
      SELECT *
      FROM tarefa
      ORDER BY codigo
    `;

    const resultado = await conexao.query(query);

    return resultado.rows;
  }

  static async listarPorCodigo(codigo) {
    const dados = [codigo];

    const query = `
      SELECT *
      FROM tarefa
      WHERE codigo = $1
    `;

    const resultado = await conexao.query(query, dados);

    return resultado.rows;
  }

  static async atualizar(
    codigo,
    titulo,
    descricao,
    responsavel,
    dataCriacao,
    prazo,
    status,
    prioridade,
  ) {
    const dados = [
      titulo,
      descricao,
      responsavel,
      dataCriacao,
      prazo,
      status,
      prioridade,
      codigo,
    ];

    const query = `
  INSERT INTO tarefa (
    titulo,
    descricao,
    codigo,
    responsavel,
    dataCriacao,
    prazo,
    status,
    prioridade
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *
`;
    const resultado = await conexao.query(query, dados);

    return resultado.rows;
  }

  static async atualizarParcial(
    codigo,
    titulo,
    descricao,
    responsavel,
    dataCriacao,
    prazo,
    status,
    prioridade,
  ) {
    const dados = [
      titulo,
      descricao,
      responsavel,
      dataCriacao,
      prazo,
      status,
      prioridade,
      codigo,
    ];

    const query = `
      UPDATE tarefa
      SET
        titulo = COALESCE($1, titulo),
        descricao = COALESCE($2, descricao),
        responsavel = COALESCE($3, responsavel),
        data_criacao = COALESCE($4, dataCriacao),
        prazo = COALESCE($5, prazo),
        status = COALESCE($6, status),
        prioridade = COALESCE($7, prioridade)
      WHERE codigo = $8
      RETURNING *
    `;

    const resultado = await conexao.query(query, dados);

    return resultado.rows;
  }

  static async excluirPorCodigo(codigo) {
    const dados = [codigo];

    const query = `
      DELETE FROM tarefa
      WHERE codigo = $1
      RETURNING *
    `;

    const resultado = await conexao.query(query, dados);

    return resultado.rows;
  }

  static async excluirTodos() {
    const query = `
      DELETE FROM tarefa
      RETURNING *
    `;

    const resultado = await conexao.query(query);

    return resultado.rows;
  }
}

export default TarefaModel;
