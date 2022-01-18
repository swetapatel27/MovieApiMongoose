var mongoose = require('mongoose')
var express = require('express')
var route = require('./routes')
var bodyParser =require('body-parser')
mongoose.connect('mongodb://localhost:27017/movies').then(()=>{
    console.log('connected')

    app = express();
    app.use(bodyParser.urlencoded({extended:false}))
    app.use('/api',route)
    
    app.listen(3000,()=>{
        console.log('server started')
    })
}).catch((e)=>{
    console.log(e.toString())
})
