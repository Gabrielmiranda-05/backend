require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const apidocsRouter = require('./routes/apidocsRouter');
const usuariosRouter = require('./routes/usuariosRouter');

const app = express();

// Conectar ao MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rotas
app.use('/api-docs', apidocsRouter);
app.use('/usuarios', usuariosRouter);

module.exports = app;