let mongoose = require('mongoose');

let transactionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    category:{
        type: String,
        required: true
    },
    TransactionID:{
        type: String,
        required: true
    
    }
});

let Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;