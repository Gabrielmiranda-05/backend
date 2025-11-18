const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware');

// POST /usuarios
router.post('/', usuariosController.criar);

// POST /usuarios/login
router.post('/login', usuariosController.entrar);

// POST /usuarios/renovar
router.post('/renovar', verificarToken, usuariosController.renovar);

// DELETE /usuarios
router.delete('/', verificarToken, usuariosController.remover);

module.exports = router;