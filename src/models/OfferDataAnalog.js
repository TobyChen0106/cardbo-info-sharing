const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferDataAnalogSchema = new Schema({
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
    TripleType: [String], // Only in OfferData-Digital, OfferData-Analog
    Region: [String] // Only in OfferData-Analog
})

const OfferDataAnalog = mongoose.model('OfferDataAnalog', OfferDataAnalogSchema, "OfferData-Analog");
module.exports = OfferDataAnalog;