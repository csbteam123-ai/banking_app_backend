let express = require('express');
let app = express();
let dotenv = require('dotenv');
let cors = require('cors');

app.use(cors())

dotenv.config();


const getpg = require("./component/routes/getpg");
const connectToMongo = require('./component/config/mongo_connect');
const userRoute = require('./component/routes/user.route')

app.use(express.json())

app.use("/",getpg,userRoute)



app.listen(3000,()=>{
    connectToMongo();
    
    console.log("server is runing")
})