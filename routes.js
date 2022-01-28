var express = require('express');
var router = express.Router();
var Movie = require('./Models/Movie')





//to fetch movies
router.get('/movies',async(req,res)=>{
    const imovie = await Movie.find()
    res.send(imovie)
})

//to add the movies
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


// api for updating movie

router.patch('/movies/:id',async (req,res)=>{
    const imovie = await Movie.findOne({_id:req.params.id})
    imovie.name = req.body.name
    imovie.rating = req.body.rating
    await imovie.save((err,msg)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        else{
            res.status(200).json({
                msg:msg
            })
        }
    })

})

//delete api

router.delete("/movies/:name",async(req,res)=>{
    await Movie.deleteOne({name:req.params.name},(err,msg)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        else{
            res.status(200).json({
                msg:msg
            })
        }

    })
})















module.exports = router 