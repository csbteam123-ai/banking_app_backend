let express = require("express");
const tokenck = require("../middleware/tokenck");
const {addMney,success} = require("../controlers/request/add.money");
let route = express.Router()

route.post("/request/add/money",tokenck,addMney)
route.post("/payment/success/:userid",success)


module.exports = route;