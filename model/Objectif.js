var mongo=require("mongoose");
const Schema=mongo.Schema;
const Objectif= new Schema(
    {
        objectif:String,
        frequence:{
            type:String,
            enum:['annuel','mensuel'],
            required:true
        },
        
    }
)

module.exports=mongo.model("objectif",Objectif)