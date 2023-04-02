const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const { StatusCodes } = require('http-status-codes')
const localStorage = require('localStorage');

async function verifyToken(req, res, next) {
    try {
        // const auth =await req.get('Authorization')
        // const token = auth.replace("Bearer ","")
        let token = req.cookies.jwtoken;
        //  token = localStorage.getItem(token)
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await UserModel.findOne({_id:verifyUser._id})
        // console.log(verifyUser)
        // console.log(rootUser)
        if(!rootUser)
        {
            res.status(StatusCodes.UNAUTHORIZED).json({message:"token is not verifyed"})
        }
        else{
            req.token = token;
            req.rootUser = rootUser
            req.userId = rootUser._id
            next();

        }
       
        
    } catch (error) {
        console.log("token verify error ", error)
        res.status(StatusCodes.UNAUTHORIZED).json({message:"Access deniyed"})
    }

}

module.exports = verifyToken;

















// const { StatusCodes } = require('http-status-codes')
// const UserModel = require("../models/UserModel.js")
// const jwt = require("jsonwebtoken")
// const VerifyTok = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt
//         const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
//         const rootUser = await UserModel.findOne({_id:verifyUser._id})
//         if (verifyUser) {
//             req.token = token
//             req.rootUser = rootUser

//             next()
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(StatusCodes.UNAUTHORIZED).json({ message: "please login first" })
//     }
// }
// module.exports = VerifyTok
















