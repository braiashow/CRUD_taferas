class TarefaModel {
    constructor(titulo, descricao, codigo, responsavel, dataCriacao, prazo, status, prioridade){
        this.titulo = titulo;
        this.descricao = descricao;
        this.codigo = codigo;
        this.responsavel = responsavel;
        this.dataCriacao = dataCriacao;
        this.prazo = prazo;
        this.status = status;
        this.prioridade = prioridade;
    }
}
export default TarefaModel