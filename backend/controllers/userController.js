const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({ message: `Usuário ${name} criado com sucesso.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }
    
    res.status(200).json({ email: user.email, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userDetails = {
      name: req.user.name,
      email: req.user.email,
    };

    res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter detalhes do usuário.' });
  }
};