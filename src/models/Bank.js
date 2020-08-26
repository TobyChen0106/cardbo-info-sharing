const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BankSchema = new Schema({
    _id: String,
    BankName: String,
    BankImage: String,
    BankCode: String,
    BankWebsite: String,
    BankCards: [String]
});

const Bank = mongoose.model('Bank', BankSchema, 'Bank');
module.exports = Bank;