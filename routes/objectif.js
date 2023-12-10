const express = require("express");
const router = express.Router();
const objectifcontroller = require("../controller/objectifcontroller");

router.post('/add', objectifcontroller.add);
router.get('/showall',objectifcontroller.show);
router.put('/update/:id',objectifcontroller.update);
router.delete('/delete/:id',objectifcontroller.deleteObjectif);
router.get('/find/:id',objectifcontroller.findObjectif);
router.get('/findName/:objectif',objectifcontroller.findObjectifName);

router.get('/objectif',(req,res,next)=>{
    res.render("objectif");
})
router.get('/tousobjectif',(req,res,next)=>{
    res.render("tousobjectif");
})
module.exports = router;
