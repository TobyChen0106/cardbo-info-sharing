const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    userID: mongoose.ObjectId,
    content: String,
    showStatus: Bool,
    time: String
})

const OfferPostSchema = new Schema({
    offerID: [mongoose.ObjectId],
    comments: [commentSchema],
    like: [mongoose.ObjectId],
    dislike: [mongoose.ObjectId],
    views: Number,
})

const OfferPost = mongoose.model('OfferPost', OfferPostSchema, "OfferPost");
module.exports = OfferPost;