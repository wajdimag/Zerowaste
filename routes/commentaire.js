const express = require("express");
const router = express.Router();
const commentaireController = require("../controller/commentairecontroller");

router.post("/addcomment", commentaireController.addcomment);
router.get("/getall", commentaireController.getall);
router.get("/getbyid/:id", commentaireController.getbyid);
router.delete("/deletebyid/:id", commentaireController.deletebyid);
router.get("/commentaire", (req, res, next) => {
    res.render("commentaire");
  });
module.exports = router;