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


exports.getTravelDetails = async (req, res) => {
  try {
    const travelDetails = await Travel.findById(req.params.id);
    if (!travelDetails) {
      return res.status(404).json({ message: 'Viagem não encontrada.' });
    }

    res.status(200).json(travelDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter detalhes da viagem.' });
  }
};
