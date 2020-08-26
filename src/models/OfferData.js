const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferDataSchema = new Schema({
    _id: String,
    OfferName: String,
    OfferCards: [String],
    OfferPays: [String],
    OfferPlaces: [String],
    Tags: [String],
    Note: String,
    Content: String,
    Category: String,
    Value: Number,
    ValuePercant: Number,
    BeginDate: String,
    EndDate: String,
});

const OfferData= mongoose.model('OfferData', OfferDataSchema, "OfferData");
module.exports = OfferData;