const express = require('express');


const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

const app = express();


app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const tarefasRouter = express.Router();


tarefasRouter.get('/', (req, res) => {
  res.json(tarefas);
});


tarefasRouter.post('/', (req, res) => {
  const { nome, concluida = false } = req.body;
  const novaTarefa = {
    id: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
    nome,
    concluida
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});


tarefasRouter.use('/:tarefaId', (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === tarefaId);
  
  if (!tarefa) {
    const erro = new Error('Tarefa não localizada');
    erro.status = 404;
    return next(erro);
  }
  
  req.tarefa = tarefa;
  req.tarefaId = tarefaId;
  next();
});


tarefasRouter.get('/:tarefaId', (req, res) => {
  res.json(req.tarefa);
});

tarefasRouter.put('/:tarefaId', (req, res) => {
  const { nome, concluida } = req.body;
  
  if (nome !== undefined) req.tarefa.nome = nome;
  if (concluida !== undefined) req.tarefa.concluida = concluida;
  
  res.json(req.tarefa);
});


tarefasRouter.delete('/:tarefaId', (req, res) => {
  const index = tarefas.findIndex(t => t.id === req.tarefaId);
  tarefas.splice(index, 1);
  res.status(204).send();
});


app.use('/tarefas', tarefasRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 400).json({ error: err.message });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;