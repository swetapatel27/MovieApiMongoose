var mongoose = require('mongoose')
var express = require('express')
var route = require('./routes')
var bodyParser =require('body-parser')
const cors = require("cors");
mongoose.connect('mongodb+srv://studentdb:studentdb123@mycluster.jtfqi.mongodb.net/Student?retryWrites=true&w=majority').then(()=>{
    console.log('connected')

    app = express();
    app.use(cors());
    app.use(express.json())
    app.use(bodyParser.urlencoded({extended:false}))
    app.use('/api',route)
    
    app.get('/', (req,res)=>{
        res.sendFile('index.html',{root:__dirname})
    })

    app.listen((process.env.PORT||3000),()=>{
        console.log('server started')
    })
}).catch((e)=>{
    console.log(e.toString())
})
