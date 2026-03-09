let express = require('express');
const { usercrate, userLogin } = require('../controlers/users/user.controler');
const exiestUser = require('../controlers/users/user.find');
const tokenck = require('../middleware/tokenck');
let route = express.Router();

route.post("/register",usercrate)
route.post("/login",userLogin)
route.get("/exiest",tokenck,exiestUser)


module.exports = route;