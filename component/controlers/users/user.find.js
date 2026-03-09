const jwt = require("jsonwebtoken");
let user_info = require("../../model/user.models");


const exiestUser = async (req, res) => {
    const token = req.token;
    try {
        // console.log(vfToken)
        const user = await user_info.findOne({_id:token.id},{password:0})
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json({
            message:"user exist",
            user:true,
            userData:user
        })
    } catch (error) {
        res.status(500).json({ message: "Error occurred while checking user existence" });
    }
}

module.exports = exiestUser;