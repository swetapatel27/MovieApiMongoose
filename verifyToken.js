const jwt = require('jsonwebtoken');

function verifyToken (req,res,next){
    const token = req.header('auth-token')
    if(!token){
        res.send('access denied')
    }

    try{
        const verified = jwt.verify(token,"mytoken")
        req.user = verified
        // return next()
    }
    catch(err){
        res.send(err)
    }
}

module.exports = verifyToken