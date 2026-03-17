let express = require('express');
const tokenck = require('../middleware/tokenck');
let route = express.Router();
const sendMoney = require("../controlers/send.money/send.money");
const GetTransaction = require('../controlers/send.money/get.Transaction');

route.post("/send/money/:senderid",tokenck,sendMoney)
route.get("/get/transaction",tokenck,GetTransaction)


module.exports = route