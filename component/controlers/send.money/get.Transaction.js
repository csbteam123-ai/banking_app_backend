const user_info = require("../../model/user.models");


const GetTransaction =async (req,res)=>{
    const token = req.token;
    try {
        const transactions = await user_info.findOne({ _id: token.id },{"Transactions":1}).populate("Transactions");
        return res.status(200).json({ transactions });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}

module.exports = GetTransaction;