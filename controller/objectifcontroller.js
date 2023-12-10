const Objectif = require("../model/Objectif");

async function add(req, res, next) {
  try {
    const objectif = new Objectif(req.body);
    await objectif.save();
    res.status(200).send("objectif added successfully");
  } catch (err) {
    console.error(err);
  }
}

async function show(req, res, next) {
  try {
    const data = await Objectif.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}
async function update(req, res, next) {
  try {
    const data = await Objectif.findByIdAndUpdate(req.params.id, req.body);
    res.send("updated");
  } catch (err) {}
}
async function deleteObjectif(req, res, next) {
    try{
     const data = await Objectif.findByIdAndDelete(req.params.id,req.body);
     res.send("removed");
    }
    catch(err){}
   }
   async function findObjectif(req, res, next) {
    try{
     const data = await Objectif.findById(req.params.id,req.body);
     res.send(data);
    }
    catch(err){}
   }
   async function findObjectifName(req, res, next) {
    try{
      
     const data = await Objectif.findOne(req.params);
     res.send(data);
    }
    catch(err){
  
    }
   }

   async function addobjectif(data) {
    try {
      const objectif = new Objectif({
        objectif: data.objectif,
        frequence: data.frequence,


      });
      await objectif.save();
      //res.status(200).send("donneur added successfully");
    } catch (err) {
      console.error(err);
    }
  }

async function show(req, res, next) {
    try {
        const data = await Objectif.find();
        //res.json(data);
        return data;
    } catch (err) {
        console.log(err);
        //res.status(500).send("Erreur lors de la récupération des activités");
    }
}







module.exports = { add ,show, update,deleteObjectif,findObjectif,findObjectifName,addobjectif,
  };

