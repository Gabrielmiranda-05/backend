const { cifrarSenha, compararSenha, gerarToken } = require('../middlewares/authMiddleware');
const Usuario = require('../models/usuariosModel');

const criar = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
    }

    const senhaCifrada = cifrarSenha(senha);
    const novoUsuario = await Usuario.create({
      email: email,
      senha: senhaCifrada
    });

    return res.status(201).json({
      _id: novoUsuario._id,
      email: novoUsuario.email
    });
  } catch (error) {
    return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
  }
};

const entrar = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    const usuarioEncontrado = await Usuario.findOne({ email: usuario });
    
    if (!usuarioEncontrado || !compararSenha(senha, usuarioEncontrado.senha)) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    const token = gerarToken({ email: usuario });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ msg: 'Credenciais inválidas' });
  }
};

const renovar = async (req, res) => {
  try {
    const token = gerarToken({ email: req.usuario.email });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao renovar token' });
  }
};

const remover = async (req, res) => {
  try {
    await Usuario.findOneAndDelete({ email: req.usuario.email });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao remover usuário' });
  }
};

module.exports = {
  criar,
  entrar,
  renovar,
  remover
};