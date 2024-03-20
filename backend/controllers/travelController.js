const Travel = require('../models/travelModel');

exports.createTravel = async (req, res) => {
  const { user, origin, destination, estimatedPrice, travelTime, appUsed, distance } = req.body;

  try {
    const newTravel = new Travel({
      user,
      origin,
      destination,
      estimatedPrice,
      travelTime,
      appUsed,
      distance
    });

    await newTravel.save();

    res.status(201).json({ message: 'Viagem criada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar viagem.' });
  }
};


exports.getAllTravels = async (req, res) => {
  try {
    const userId = req.query.userId;
    const travels = await Travel.find({ user: userId });

    res.status(200).json(travels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar viagens.' });
  }
};

