const mongoose = require('mongoose');

const connectToMongo =async () => {
    
    try {
        console.log(process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connect✅")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToMongo;
