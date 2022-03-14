var express = require('express');
var router = express.Router();
var Movie = require('./Models/Movie')
var User = require('./Models/User')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
var verifyToken = require('./verifyToken')



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

    console.log(imovie)
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


router.post('/users',async(req,res)=>{
    
    //generate salt key
    salt = await bcrypt.genSalt(10)
    console.log(salt)

    hashedpswd = await bcrypt.hash(req.body.password,salt)
    console.log(hashedpswd)

    const iuser = new User({
        uname:req.body.uname,
        password:hashedpswd
    })  
    await iuser.save((err,msg)=>{
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

// router.post('/login',async(req,res)=>{

//     const iuser = await User.findOne({uname:req.body.uname})
//     if(!iuser){
//         res.send("user does not exists")
//     }
//     else{

//       const isValid = await bcrypt.compare(req.body.password,iuser.password)
//       console.log(isValid)
//         res.send(isValid)

//     }


// })



router.post('/login',async(req,res)=>{
    const user =await User.findOne({uname:req.body.uname})
    if(!user){
        return res.send("user not found")
    }
    const isValid = await bcrypt.compare(req.body.password,user.password)
    console.log(isValid)


//send token for verification

    if(isValid){
        const token = await jwt.sign({_id:user._id},"mytoken")
        res.header('auth-token',token).send(token)
    }
    else{
        res.send("invalid password")
    }
})












module.exports = router 