const tarefaModel = require('../models/tarefaModel');

exports.listar = (req, res) => {
  const resultado = tarefaModel.listar();
  res.json(resultado);
};

exports.buscarPeloId = (req, res) => {
  const resultado = tarefaModel.buscarPeloId(req.params.tarefaId);
  
  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: "Tarefa não encontrada" });
  }
};

exports.criar = (req, res) => {
  const resultado = tarefaModel.criar(req.body);
  res.status(201).json(resultado);
};

exports.atualizar = (req, res) => {
  const tarefa = { ...req.body, id: req.params.tarefaId };
  const resultado = tarefaModel.atualizar(tarefa);
  
  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: "Tarefa não encontrada" });
  }
};

exports.remover = (req, res) => {
  const resultado = tarefaModel.remover(req.params.tarefaId);
  
  if (resultado) {
    res.status(204).send();
  } else {
    res.status(404).json({ msg: "Tarefa não encontrada" });
  }
};