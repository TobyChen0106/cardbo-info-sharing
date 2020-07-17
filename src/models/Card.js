const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
    CardName: String,
    CardImage: String,
    ServiceAgent: String,
    CardGrade: String,
    BankID: mongoose.ObjectId,
    Offers: [mongoose.ObjectId],
});

const Card = mongoose.model('Card', CardSchema, 'Card');
module.exports = Card;