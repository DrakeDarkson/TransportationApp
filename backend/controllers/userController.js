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
    
    res.status(200).json({ id: user._id, name: user.name, email: user.email, apps: user.apps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};

exports.editUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.params.id;
  
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email, password }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    const user = await User.findById(userId);
    res.status(200).json({ id: user._id, name: user.name, email: user.email, apps: user.apps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Usuário excluído com sucesso.', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir usuário.' });
  }
};

exports.editPreferences = async (req, res) => {
  const userId = req.params.id;
  const { apps } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    user.apps = apps;
    await user.save();

    res.status(200).json({ id: user._id, name: user.name, email: user.email, apps: user.apps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar preferências do usuário.' });
  }
};

