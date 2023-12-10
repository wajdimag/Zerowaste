const Preference = require('../models/preference');

// Add Preference
async function addPreference(req, res, next) {
  try {
    const newPreference = new Preference(req.body);
    await newPreference.save();
    res.status(201).json({ message: 'Préférence créée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all Preferences
async function getPreferences(req, res, next) {
  try {
    const preferences = await Preference.find({});
    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get Preference by ID
async function getPreferenceById(req, res, next) {
  try {
    const preference = await Preference.findById(req.params.id);
    if (!preference) {
      return res.status(404).json({ message: 'Préférence introuvable' });
    }
    res.status(200).json(preference);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update Preference
async function updatePreference(req, res, next) {
  try {
    const preference = await Preference.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!preference) {
      return res.status(404).json({ message: 'Préférence introuvable' });
    }
    res.status(200).json({ message: 'Préférence mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete Preference
async function deletePreference(req, res, next) {
  try {
    const preference = await Preference.findByIdAndDelete(req.params.id);
    if (!preference) {
      return res.status(404).json({ message: 'Préférence introuvable' });
    }
    res.status(200).json({ message: 'Préférence supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addPreference,
  getPreferences,
  getPreferenceById,
  updatePreference,
  deletePreference,
};
