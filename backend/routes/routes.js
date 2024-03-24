const express = require('express');
const cors = require('cors');

const router = express.Router();
const userController = require('../controllers/userController');
const travelController = require('../controllers/travelController');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

router.use(cors(corsOptions));

router.get('/', (req, res) => { res.send('Bem-vindo ao backend!'); });

router.get('/api/getAllTravels', travelController.getAllTravels);

router.post('/api/createUser', userController.createUser);

router.post('/api/createTravel', travelController.createTravel);

router.post('/api/loginUser', userController.signin);

router.delete('/api/deleteTravelHistory/:userId', travelController.deleteTravelHistory);

router.delete('/api/deleteUser/:id', userController.deleteUser);

router.put('/api/editUser/:id', userController.editUser);

router.put('/api/editPreferences/:id', userController.editPreferences);

module.exports = router;
