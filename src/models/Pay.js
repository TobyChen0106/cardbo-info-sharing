const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaySchema = new Schema({
    _id: String,
    PayName: String,
    PayImage: String,
    TripleOffers: [String]
});

const Pay = mongoose.model('Pay', PaySchema, 'MobilePay');
module.exports = Pay;