//check every incoming request to see if it has auth header
//verify token  from auth header and set user

const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const token_very = process.env.TOKEN_SECRET

const authMiddleware = (req,res,next) =>{
    const header = req.get('Authorization')
    if (!header){
        req.authUser = false //no auth hence no token
        next()
    }
    const token = header.split('')[1] // ? Authorization : ____ token - splits in array and has barrier and token
    if (!token || token == ""){
        req.authUser = false
        next()
    }else{
        const decoded  = jwt.verify(token, token_very)
        req.authUser = true
        res.userId = decoded.userId
    }
}


module.exports = authMiddleware