var mongo=require("mongoose");
const Schema=mongo.Schema;
const Activite= new Schema(
    {
        nom_activite:String,
        compteur_initial:String,
        compteur_final:String,
        quantite_consomme:String
    }
)

module.exports=mongo.model("activite",Activite)