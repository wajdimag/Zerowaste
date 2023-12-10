const Alerte = require('../models/alerte');

// Add Alerte
async function addAlerte(req, res, next) {
  try {
    const newAlerte = new Alerte(req.body);
    await newAlerte.save();
    res.status(201).json({ message: 'Alerte créée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all Alertes
async function getAlertes(req, res, next) {
  try {
    const alertes = await Alerte.find({});
    res.status(200).json(alertes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get Alerte by ID
async function getAlerteById(req, res, next) {
  try {
    const alerte = await Alerte.findById(req.params.id);
    if (!alerte) {
      return res.status(404).json({ message: 'Alerte introuvable' });
    }
    res.status(200).json(alerte);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update Alerte
async function updateAlerte(req, res, next) {
  try {
    const alerte = await Alerte.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!alerte) {
      return res.status(404).json({ message: 'Alerte introuvable' });
    }
    res.status(200).json(alerte);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete Alerte
async function deleteAlerte(req, res, next) {
  try {
    const alerte = await Alerte.findByIdAndDelete(req.params.id);
    if (!alerte) {
      return res.status(404).json({ message: 'Alerte introuvable' });
    }
    res.status(200).json({ message: 'Alerte supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addAlerte,
  getAlertes,
  getAlerteById,
  updateAlerte,
  deleteAlerte,
};
