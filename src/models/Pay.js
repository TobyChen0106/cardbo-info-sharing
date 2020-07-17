const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaySchema = new Schema({
    PayName: String,
    PayImage: String,
    TripleOffers: [mongoose.ObjectId]
});

const Pay = mongoose.model('Pay', PaySchema, 'MobilePay');
module.exports = Pay;