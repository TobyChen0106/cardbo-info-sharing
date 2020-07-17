const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    lineID: String,
    displayName: String,
    userImage: String,
    phone: String,
    email: String,
    city: String,
    favos: {
        type: [mongoose.ObjectId],
        default: []
    },
    ownCards: {
        type: [mongoose.ObjectId],
        default: []
    },
    ownPays: {
        type: [mongoose.ObjectId],
        default: []
    },
    CallCardbo_Pays_Warning: {
        type: String,
        default: ""
    },
    SortByCategory_Pays_Warning: {
        type: String,
        default: ""
    }, // "Yes"、"No"
    tripleType: {
        type: String,
        default: ""
    }, // "實體券"、"悠遊卡"、"一卡通"、"有錢卡"、"愛金卡"、"行動支付"、"信用卡"、"先不告訴你"
    tripleCardorPayID: {
        type: String,
        default: null
    },
    favos: {
        type: [mongoose.ObjectId],
        default: []
    }
})

const User = mongoose.model('User', UserSchema, "User");
module.exports = User;

