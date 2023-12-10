const express = require('express');
const router = express.Router();
const validateInput = require('../middleware/validateInput');
const AlerteController = require('../controllers/alerteController');

// Create new alerte
router.post('/alertes', validateInput, AlerteController.createAlerte);

// Get all alertes
router.get('/alertes', AlerteController.getAllAlertes);

// Get alerte by ID
router.get('/alertes/:id', AlerteController.getAlerteById);

// Update alerte
router.put('/alertes/:id', validateInput, AlerteController.updateAlerte);

// Delete alerte
router.delete('/alertes/:id', AlerteController.deleteAlerte);

module.exports = router;
