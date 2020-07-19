const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    lineID: String,
    content: String,
    showStatus: Boolean,
    time: String
})

const OfferPostSchema = new Schema({
    offerID: mongoose.ObjectId,
    comments: [commentSchema],
    likes: [String],
    dislikes: [String],
    views: Number,
})

const OfferPost = mongoose.model('OfferPost', OfferPostSchema, "OfferPost");
module.exports = OfferPost;