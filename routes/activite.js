const express = require("express");
const router = express.Router();
const activitecontroller = require("../controller/activitecontroller");

router.post('/add', activitecontroller.add);
router.get('/showall',activitecontroller.show);
router.put('/update/:id',activitecontroller.update);
router.delete('/delete/:id',activitecontroller.deleteActivite);
router.get('/find/:id',activitecontroller.findActivite);
router.get('/findName/:name',activitecontroller.findActiviteName);

router.get('/activite',(req,res,next)=>{
    res.render("activite");
})
router.get('/tousactivite',(req,res,next)=>{
    res.render("tousactivite");
})
module.exports = router;
