let mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"user"
    },
    phone:{
        type:String,
        require:true
    },
    ammount:{
        type:Number,
        default:0
    },
    time:{
        type:Date,
        default:Date.now
    
    },
    accout_number:{
        type:String,
        require:true,
        unique:true
    },
    Transactions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction"
    }],
    card:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"card"
    }]
})

let user_info = mongoose.model("user_info",userModel)
module.exports = user_info