const express = require("express");
const router = express.Router();
const articleController = require("../controller/articlecontroller");

router.post("/add", articleController.add);
router.get("/getall", articleController.getall);
router.get("/getbyid/:id", articleController.getbyid);
router.delete("/deletebyid/:id", articleController.deletebyid);
router.get("/article", (req, res, next) => {
    res.render("article");
  });

module.exports = router;