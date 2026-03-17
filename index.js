let express = require('express');
let app = express();
let dotenv = require('dotenv');
let cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors())

dotenv.config();


const getpg = require("./component/routes/getpg");
const connectToMongo = require('./component/config/mongo_connect');
const userRoute = require('./component/routes/user.route')
const sendmMoneyRoute = require("./component/routes/send.mouny.route")

app.use(express.json())

app.use("/",getpg,userRoute,sendmMoneyRoute)



app.listen(PORT,()=>{
    connectToMongo();
    
    console.log("server is runing")
})