const user_info = require("../../model/user.models");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const usercrate =async (req,res)=>{
    const {fullName,email,phone,password} = req.body;
    try {

        let hashPassword = await bcrypt.hash(password,10)

        let account_gen = Math.floor(10000000000 + Math.random() * 90000000000)
        let userCreate = await user_info.create({
            name:fullName,
            email,
            phone,
            password:hashPassword,
            accout_number:account_gen
        })

        let token = jwt.sign({id:userCreate._id},process.env.KEY,{expiresIn:"1d"})

        res.status(200).json({userCreate, token})

    } catch (error) {
        res.status(500).json({message:"something went wrong", error:error})
    }


}

const userLogin = async (req,res)=>{
    const {email,password} = req.body;
    try {
        let user = await user_info.findOne({email})
        if(!user){
            return res.status(400).json({message:"invalid email or password"})
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"invalid email or password"})
        }
        const token = jwt.sign({id:user._id},process.env.KEY,{expiresIn:"1d"})
        res.status(200).json({message:"login successful", token})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error:error})
    }
}

module.exports = {usercrate, userLogin}