var express = require('express');
var router = express.Router();
var Movie = require('./Models/Movie')
router.post("/movies",async(req,res)=>{
    const imovie = new Movie({
        name:req.body.name,
        rating:req.body.rating
    })

    await imovie.save((err,msg)=>{
        if(err){
            res.status(500).json({
                "error":err
            })
        }
        else{
            res.status(200).json({
                "My-message":msg
            })
        }
    })

})

module.exports = router 