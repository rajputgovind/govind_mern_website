const express = require("express")
const { StatusCodes } = require('http-status-codes')
const UserModel = require("../models/UserModel.js")
const bcrypt = require('bcrypt')
const UserRouter = express.Router()
const jwt = require("jsonwebtoken")
const localStorage = require('localStorage');

const verifyToken = require('../middleware/VerifyToken')
UserRouter.get("/", (req, res) => {
    res.status(StatusCodes.OK).send("hello from the server")
})


UserRouter.post("/registers", async (req, res) => {
    try {

        const { name, email, phone, work, password, cpassword } = req.body


        const isEmailMatch = await UserModel.findOne({ email: email })

        if (!name || !email || !phone || !work || !password || !cpassword) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Plz filled the field properly" })
        }
        else if (isEmailMatch) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Email Already Exist" })

        }
        else if (password === cpassword) {

            // Encrypted password code
            const encryptedPassword = bcrypt.hashSync(req.body.password, 12)
            req.body['password'] = encryptedPassword
            const encryptedConPassword = bcrypt.hashSync(req.body.cpassword, 12)
            req.body['cpassword'] = encryptedConPassword
            // const user =  UserModel(req.body)
            const { name, email, phone, work, password, cpassword } = req.body
            const user = UserModel({ name, email, phone, work, password, cpassword })

            // Token generating code
            // const token =await user.generateAuthToken();

            const savedUser = await user.save()
            res.status(StatusCodes.CREATED).json(savedUser)


        }
        else {

            res.status(StatusCodes.BAD_REQUEST).json({ message: "confirm password not match" })

        }


    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in saving data", error: error })
    }

})

UserRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = ({ email, password })
        const isEmailMatch = await UserModel.findOne({ email: req.body.email })
        // console.log(isEmailMatch)
        // const isPasswordMatch = (isEmailMatch.password === req.body.password)
        const isPasswordMatch = bcrypt.compareSync(req.body.password, isEmailMatch.password)
        if (!email || !password) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "please fill email and password" })
        }



        else if (isPasswordMatch) {

            const token = await isEmailMatch.generateAuthToken()
            // console.log(token)
            // localStorage.setItem('token', token);
            // localStorage.setItem()
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 258920000),
                httpOnly:true
                // secure:true
            })
            res.status(StatusCodes.CREATED).json(isEmailMatch)
        }


        else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid email Details" })
        }


    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

UserRouter.get("/login", (req, res) => {
    res.status(StatusCodes.OK).send("hello this is login page")
})

// about as page code

UserRouter.get("/about", verifyToken, async(req, res) => {
    try {
        // res.status(StatusCodes.OK).json({message:"About page login successsful"})
        // console.log(req.rootUser)
        res.status(StatusCodes.OK).send(req.rootUser)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching about as page"})
    }
})

// get user data for contact us and home page 
UserRouter.get("/contact",verifyToken, async(req,res)=>{
    try {
        res.status(StatusCodes.OK).send(req.rootUser)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching about as page"})
    }
})

UserRouter.post("/contacts",verifyToken, async(req,res)=>{
   try {
        const { name, email, phone , message} = req.body;
        if(!name ||  !email ||  !phone  ||  !message )
        {
            console.log("error in contact form")
            res.status(StatusCodes.BAD_REQUEST).json({error:"plzz filled the contact form"})
        }
        const userContact =await UserModel.findOne({_id:req.userId})
        if(userContact){
            const userMessage =await userContact.addMessage(name, email, phone , message)

            await userContact.save()
            console.log("message add successful")
            res.status(StatusCodes.CREATED).json({message:"user contact succcessful"})
        }
   } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in sanding message"})
   }
    
})

UserRouter.get("/logout",async(req,res)=>{
    try {
        res.clearCookie("jwtoken", {path:'/'})
    
        res.status(StatusCodes.OK).json({message:"Logout successful"})
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in logout"})
    }
})

module.exports = UserRouter;
