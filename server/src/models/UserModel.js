const mongoos = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema= new mongoos.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:Number, required:true},
    work:{type:String, required:true},
    password:{type:String, required:true},
    cpassword:{type:String, required:true},
    date:{type:Date, default:Date.now},
    messages:[
        {
            name:{type:String, required:true},
            email:{type:String, required:true},
            phone:{type:String, required: true},
            message:{type:String, required:true}
        }
    ],
    tokens:[{
        token:{type:String, required:true}
    }]
})


userSchema.methods.generateAuthToken = async function(){
    try {
        // console.log("token code")
        const token = await jwt.sign({_id:this._id}, process.env.SECRET_KEY)    
        this.tokens = this.tokens.concat({token:token})

        await this.save()
        return token;
    } catch (error) {
        console.log("error in genreting token", error)
    }
    
}

// store the message

userSchema.methods.addMessage = async function(name, email, phone , message){
    try {
        console.log("message store code")
        this.messages = this.messages.concat({name, email, phone , message})

        await this.save()
        return this.messages;
    } catch (error) {
        console.log(error)
    }
}

 const UserModel = new mongoos.model('UserData', userSchema)

module.exports = UserModel;