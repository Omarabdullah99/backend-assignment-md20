const mongoose= require('mongoose')


const UserSchema= mongoose.Schema({
    name: { type: String, required: true},
    email:{type:String, unique:true, required:true,lowercase:true},
    password: { type: String, required: true },
},
{timestamps:true}

)


const UserModel= mongoose.model("users", UserSchema)

module.exports= UserModel