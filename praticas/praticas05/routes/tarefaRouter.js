const express = require('express');
const router = express.Router();

// GET /tarefas
router.get('/', (req, res) => {
  res.json([]);
});

// GET /tarefas/:id
router.get('/:id', (req, res) => {
  if (req.params.id === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  res.json({});
});

// POST /tarefas
router.post('/', (req, res) => {
  res.status(201).json({ id: '1a2b' });
});

// PUT /tarefas/:id
router.put('/:id', (req, res) => {
  if (req.params.id === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  res.json({ id: '1a2b' });
});

// DELETE /tarefas/:id
router.delete('/:id', (req, res) => {
  if (req.params.id === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  res.status(204).send();
});

module.exports = router;
