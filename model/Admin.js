var mongo=require("mongoose");
const Schema=mongo.Schema;
const Admin= new Schema(
    {
        name:String,
        email:String,
        nbrstudent:Number,  
    }
)

module.exports=mongo.model("admin",Admin)