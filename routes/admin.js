const express = require("express");
const router = express.Router();
const admincontroller = require("../controller/admincontroller");

router.post('/add', admincontroller.add);

router.get('/chat',(req,res,next)=>{
    res.render("chat");
})
module.exports = router;
