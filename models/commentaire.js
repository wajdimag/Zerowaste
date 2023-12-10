const mongo = require("mongoose");
const Schema = mongo.Schema;
const Commentaire = new Schema({
    article_id: Number ,
    user_id:Number,
    contenu: String,
    date_creation: Date
});
module.exports = mongo.model("commentaire", Commentaire);
