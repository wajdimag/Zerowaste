const mongoose = require('mongoose');
const Schema = mongo.Schema;

const Preference = new Schema({
  utilisateur_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true,
  },
  notification_frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily', // Set default frequency
  },
  periode_notif: { // Added to store chosen notification day/date
    type: String,
  },
});

module.exports = mongo.model("preference", Preference);
