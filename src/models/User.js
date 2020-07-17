const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    lineID: String,
    displayName: String,
    userImage: String,
    phone: String,
    email: String,
    city: String,
    favos: [mongoose.ObjectId],
    ownCards: [mongoose.ObjectId],
    ownPays: [mongoose.ObjectId],
    CallCardbo_Pays_Warning: String, // "Yes"、"No"
    SortByCategory_Pays_Warning: String, // "Yes"、"No"
    tripleType: String, // "實體券"、"悠遊卡"、"一卡通"、"有錢卡"、"愛金卡"、"行動支付"、"信用卡"、"先不告訴你"
    tripleCardorPayID: mongoose.ObjectId,
    favos: [mongoose.ObjectId],
})

const User= mongoose.model('User', UserSchema, "User");
module.exports = User;

