const Article = require("../models/article");

async function add(req, res, next) {
  try {
    const article = new Article({
      titre: req.body.titre,
      contenu: req.body.contenu,
      auteur_id: req.body.auteur_id,
      date_creation: new Date(),
    });
    await article.save();
    res.status(200).send("add good");
  } catch (err) {
    console.log(err);
  }
}

async function getall(req, res, next) {
  try {
    const data = await Article.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}

async function getbyid(req, res, next) {
  try {
    const data = await Article.findById(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}

async function deletebyid(req, res, next) {
  try {
    const data = await Article.findByIdAndDelete(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}
async function addarticlesocket(data) {
  try {
    const article = new Article({
      titre: data.titre,
      contenu: data.contenu,
      auteur_id: data.auteur_id,
      date_creation: new Date(),
    });
    console.log("jjjjj" + JSON.stringify(data));
    
    
    await article.save();
    //res.status(200).send("add good partie");
  } catch (err) {
    console.log(err);
  }
}
async function affichesocket(data) {
  try {
    console.log("kkkk" + JSON.stringify(data));
    const titre = await Article.findById(data.titre);
    const contenu = await Article.findById(data.contenu);
    const auteur_id = await Article.findById(data.auteur_id);
    const date_creation = await Article.findById(data.date_creation);


    r = { titre: titre, contenu: contenu, auteur_id: auteur_id, date_creation: date_creation };
    return r;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
    add,
    getall,
    getbyid,
    deletebyid,
    addarticlesocket,
    affichesocket, 
    
  };
  