const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferDataSchema = new Schema({
    OfferName: String,
    OfferCards: [mongoose.ObjectId],
    OfferPays: [mongoose.ObjectId],
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