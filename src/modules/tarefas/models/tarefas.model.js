import tarefas from "../../../config/datase.js";
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
    static cadastrar(titulo, descricao, codigo, responsavel, dataCriacao, prazo, status, prioridade){
        const dados ={
            titulo, descricao, codigo, responsavel, dataCriacao, prazo, status, prioridade,}
        tarefas.push(dados)
    }
    static listarTodos(){
        return tarefas
    }
    static listarPorCodigo(codigo){
        return tarefas.find(tarefa => tarefa.codigo === codigo)
    }
    static atualizar(codigo, novoTitulo, novoDescricao, novoResponsavel, novodataCriacao, novoPrazo, novoStatus, novoPrioridade){
        const tarefa = TarefaModel.listarPorCodigo(codigo)
        tarefa.titulo = novoTitulo
        tarefa.descricao = novoDescricao
        tarefa.responsavel = novoResponsavel
        tarefa.dataCriacao = novodataCriacao
        tarefa.prazo = novoPrazo
        tarefa.status = novoStatus
        tarefa.prioridade = novoPrioridade
        return tarefa
    }


static excluirPorCodigo(codigo) {
  const index = tarefas.findIndex(tarefa => String(tarefa.codigo) === String(codigo));

  if (index === -1) {
    return null;
  }

  const tarefaExcluida = tarefas.splice(index, 1)[0];
  return tarefaExcluida;
}


    static excluirTodos(){
        tarefas.length = 0
    }
    static atualizarParcial(codigo, novoTitulo, novoDescricao, novoResponsavel, novodataCriacao, novoPrazo, novoStatus, novoPrioridade){
        const tarefa = TarefaModel.listarPorCodigo(codigo)

        if(!tarefa){
            return null
        }
        tarefa.titulo = novoTitulo || tarefa.titulo
        tarefa.descricao = novoDescricao || tarefa.descricao
        tarefa.responsavel = novoResponsavel || tarefa.responsavel
        tarefa.dataCriacao = novodataCriacao || tarefa.dataCriacao
        tarefa.prazo = novoPrazo || tarefa.prazo
        tarefa.status = novoStatus || tarefa.status
        tarefa.prioridade = novoPrioridade || tarefa.prioridade

        return tarefa

}    static atualizarTotal(codigo, novoTitulo, novoDescricao, novoResponsavel, novodataCriacao, novoPrazo, novoStatus, novoPrioridade){
       const tarefa = TarefaModel.listarPorCodigo(codigo)

       if(!tarefa){
            return null
       }
       tarefa.titulo = novoTitulo
       tarefa.descricao = novoDescricao
       tarefa.responsavel = novoResponsavel
       tarefa.dataCriacao = novodataCriacao
       tarefa.prazo = novoPrazo
       tarefa.status = novoStatus
       tarefa.prioridade = novoPrioridade

       return tarefa
}}

export default TarefaModel