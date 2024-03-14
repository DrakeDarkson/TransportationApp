// routes/routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/userModel');

router.get('/', (req, res) => {
    res.send('Bem-vindo ao backend!');
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
});

router.post('/users', userController.createUser);

module.exports = router;
