const express = require('express');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
const tarefaRouter = require('./routes/tarefaRouter');
app.use('/tarefas', tarefaRouter);

// Rota básica para teste
app.get('/', (req, res) => {
  res.json({ message: 'API Prática 05 funcionando!' });
});

module.exports = app;

// Iniciar servidor
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}