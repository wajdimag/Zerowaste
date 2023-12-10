const Commentaire = require("../models/commentaire");

async function addcomment(req, res, next) {
  try {
    const commentaire = new Commentaire({
        article_id: req.body.article_id,
        user_id: req.body.user_id,
        contenu: req.body.auteur_id,
        date_creation: new Date(),
    });
    await commentaire.save();
    res.status(200).send("add comment good");
  } catch (err) {
    console.log(err);
  }
}

async function getall(req, res, next) {
  try {
    const data = await Commentaire.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}

async function getbyid(req, res, next) {
  try {
    const data = await Commentaire.findById(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}

async function deletebyid(req, res, next) {
  try {
    const data = await Commentaire.findByIdAndDelete(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}
async function addcommentairesocket(data) {
  try {
    const commentaire = new Commentaire({
      article_id: data.article_id,
      user_id: data.user_id,
      contenu: data.contenu,
      date_creation: new Date(),
    });
    console.log("add comment" + JSON.stringify(data));
    
    
    await commentaire.save();
    //res.status(200).send("add good partie");
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
    addcomment,
    getall,
    getbyid,
    deletebyid,
    addcommentairesocket,
    
  };
  