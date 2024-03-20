const express = require('express');
const cors = require('cors');

const router = express.Router();
const userController = require('../controllers/userController');
const travelController = require('../controllers/travelController');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

router.use(cors(corsOptions));

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

router.post('/api/createUser', userController.createUser);

router.post('/api/loginUser', userController.signin);

router.get('/api/userDetails', userController.getUserDetails);

router.post('/api/createTravel', travelController.createTravel);

router.get('/api/getAllTravels', travelController.getAllTravels);

module.exports = router;
