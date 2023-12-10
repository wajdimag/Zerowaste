const yup= require("yup");
const validate=async(req,res,next)=>{
    try{
     const Schema=yup.object().shape(
        {
            //name:yup.string().length(8).required(), // largeur de nom mayfoutsh 8 
            nom_activite:yup.string().required(),
           // dateNaissance:yup.date().required(), // ye9bel date de type jj/mm/aaaa ou jj-mm-aaaa
            //isActivate:yup.boolean().required(), //Pour ajouter un champ de type bollean qui accepte quelque soit true ou 1 / false ou 0
            //email:yup.string().email().required(),
            //email:yup.string().email().matches(/@esprit\.tn$/).required(), //nom domaine ta3 email a3tito esprit.tn 
            //nbrstudent:yup.number().required()
            //password:yup.string().required()
           //password: yup.string()
                //.required()
              //  .matches(
                  //  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                   // "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial, et doit avoir une longueur d'au moins 8 caractères."
              //  ),
        }
     )
     await Schema.validate(req.body);
     next();
    }catch (err){
    console.log(err);
    }
}



module.exports=validate;