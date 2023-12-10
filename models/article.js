const mongo = require("mongoose");
const Schema = mongo.Schema;
const Article = new Schema({
  titre: String,
  contenu:String,
  auteur_id:Number, 
  date_creation:Date,
  
});
module.exports = mongo.model("article", Article);
