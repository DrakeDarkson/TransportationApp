const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Verificar se o email já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // Criar um novo usuário
    const newUser = new User({
      name,
      email,
      password
    });

    // Salvar o novo usuário no banco de dados
    await newUser.save();

    // Retornar o nome do usuário
    res.status(201).json({ message: `Usuário ${name} criado com sucesso.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
};
