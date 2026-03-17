const generateTransactionID = require("../../config/TransactionID");
const Transaction = require("../../model/transaction.models");
const user_info = require("../../model/user.models");

const sendmoney = async (req, res) => {
  const senderid = req.params.senderid;
  const token = req.token;
  const { ammount } = req.body;
  try {
    const user = await user_info.findOne({ accout_number: senderid });
    const balance = await user_info.findOne({ _id: token.id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (balance.ammount < ammount) {
      return res.status(400).json({ message: "insufficient balance" });
    }
    user.ammount =Number(user.ammount) + Number(ammount);
    await user.save();
    balance.ammount = Number(balance.ammount) - Number(ammount);
    await balance.save();
    const transactionRes = await Transaction.create({
      userId: token.id,
      senderId: user._id,
      amount: ammount,
      category: "send money",
      TransactionID: generateTransactionID(),
      date: new Date()
    })
    user.Transactions.push(transactionRes._id);
    await user.save();
    balance.Transactions.push(transactionRes._id);
    await balance.save();



    const transaction = generateTransactionID();
    return res.send({ message: "user found", balance: balance, transaction });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = sendmoney;
