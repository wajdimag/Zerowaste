const yup = require('yup');

const validateInput = (req, res, next) => {
  const body = req.body;

  // Validation rules for Alerte
  const alerteSchema = yup.object().shape({
    type_alerte: yup.string().oneOf(['Bravo', 'Normal', 'Alerte', 'Urgence']).required(),
    message: yup.string().required(),
    date: yup.date().required(),
    periode: yup.string().oneOf(['jour', 'semaine', 'mois']).required(),
    quantite_consommee: yup.number().required(),
  });

  // Validation rules for Preference
  const preferenceSchema = yup.object().shape({
    notification_frequency: yup.string().oneOf(['daily', 'weekly', 'monthly']).default('daily'),
  });

  // Validate the input
  const errors = alerteSchema.validate(body) || preferenceSchema.validate(body);

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map(error => error.message) });
  }

  // Check if the user's water consumption is within the desired range
  const quantiteConsommee = body.quantite_consommee;
  const message = getAlertMessage(quantiteConsommee);

  // Set the alert message
  body.message = message;

  // Continue to the next middleware
  next();
};

const getAlertMessage = (quantiteConsommee) => {
  switch (quantiteConsommee) {
    case 800:
      return 'Bravo ! Votre consommation d\'eau hebdomadaire est respectueuse de l\'environnement à 800 litres. Continuez vos bonnes habitudes d\'économie d\'eau !';
    case 1200:
      return 'Vous faites bien ! Votre consommation d\'eau hebdomadaire est de 1200 litres, témoignant d\'un effort conscient pour économiser l\'eau. Continuez ainsi !';
    case 1400:
      return 'Alerte : Votre consommation d\'eau hebdomadaire a dépassé les 1400 litres. Considérez l\'identification des zones où vous pouvez économiser de l\'eau pour maintenir des pratiques respectueuses de l\'environnement.';
    default:
      return 'Urgence : Votre consommation d\'eau hebdomadaire a dépassé les limites durables. Une action immédiate est nécessaire pour réduire la consommation d\'eau et préserver les ressources.';
  }
};

module.exports = validateInput;
