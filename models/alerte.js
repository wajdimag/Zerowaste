const mongoose = require('mongoose');
const Schema = mongo.Schema;

const Alerte = new Schema({
  utilisateur_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true,
  },
  type_alerte: {
    type: String,
    enum: ['Bravo', 'Normal', 'Alerte', 'Urgence'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  periode: {
    type: String,
    enum: ['jour', 'semaine', 'mois'], // Added to store period
    required: true,
  },
  quantite_consommee: { // Added to store consumed quantity
    type: Number,
    required: true,
  },
});

module.exports = mongo.model("alerte", Alerte);
