const express = require('express');
const router = express.Router();
const validateInput = require('../middleware/validateInput');
const PreferenceController = require('../controllers/preferenceController');

// Create new preference
router.post('/preferences', validateInput, PreferenceController.createPreference);

// Get all preferences
router.get('/preferences', PreferenceController.getAllPreferences);

// Get preference by ID
router.get('/preferences/:id', PreferenceController.getPreferenceById);

// Update preference
router.put('/preferences/:id', validateInput, PreferenceController.updatePreference);

// Delete preference
router.delete('/preferences/:id', PreferenceController.deletePreference);

module.exports = router;
