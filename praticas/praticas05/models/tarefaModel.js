const tarefas = [];

exports.listar = () => {
  return tarefas;
};

exports.buscarPeloId = (tarefaId) => {
  return tarefas.find(t => t.id === tarefaId) || null;
};

exports.criar = (tarefa) => {
  const novaTarefa = {
    ...tarefa,
    id: Math.random().toString(36).substr(2, 4)
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
};

exports.atualizar = (tarefa) => {
  const index = tarefas.findIndex(t => t.id === tarefa.id);
  if (index !== -1) {
    tarefas[index] = { ...tarefas[index], ...tarefa };
    return tarefas[index];
  }
  return null;
};

exports.remover = (tarefaId) => {
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index !== -1) {
    return tarefas.splice(index, 1)[0];
  }
  return null;
};
