const Activite = require("../model/Activite");

async function add(req, res, next) {
  try {
    const activite = new Activite(req.body);
    await activite.save();
    res.status(200).send("activite added successfully");
  } catch (err) {
    console.error(err);
  }
}

async function show(req, res, next) {
  try {
    const data = await Activite.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}
async function update(req, res, next) {
  try {
    const data = await Activite.findByIdAndUpdate(req.params.id, req.body);
    res.send("updated");
  } catch (err) {}
}
async function deleteActivite(req, res, next) {
    try{
     const data = await Activite.findByIdAndDelete(req.params.id,req.body);
     res.send("removed");
    }
    catch(err){}
   }
   async function findActivite(req, res, next) {
    try{
     const data = await Activite.findById(req.params.id,req.body);
     res.send(data);
    }
    catch(err){}
   }
   async function findActiviteName(req, res, next) {
    try{
      
     const data = await Activite.findOne(req.params);
     res.send(data);
    }
    catch(err){
  
    }
   }

   async function addactivite(data) {
    try {
      const activite = new Activite({
        nom_activite: data.nom_activite,
        compteur_initial: data.compteur_initial,
        compteur_final: data.compteur_final,
        quantite_consomme: data.quantite_consomme,

      });
      await activite.save();
      //res.status(200).send("donneur added successfully");
    } catch (err) {
      console.error(err);
    }
  }

async function show(req, res, next) {
    try {
        const data = await Activite.find();
        //res.json(data);
        return data;
    } catch (err) {
        console.log(err);
        //res.status(500).send("Erreur lors de la récupération des activités");
    }
}







module.exports = { add ,show, update,deleteActivite,findActivite,findActiviteName,addactivite,
  };

