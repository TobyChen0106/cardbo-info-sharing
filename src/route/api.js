const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../models/User');
const Card = require('../models/Card');
const OfferData = require('../models/OfferData');
const OfferDataDigital = require('../models/OfferDataDigital');
const OfferDataAnalog = require('../models/OfferDataAnalog');
const Store = require('../models/Store');
const OfferPost = require("../models/OfferPost");

router.post('/append-comment-id/:id', (req, res) => {
    const id = req.params.id;
    Comment.findOne({ offerID: id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            var new_comment = new Comment({ offerID: id });
            new_comment.comments.push(req.body.new_comments);
            new_comment.save().then(() => {
                res.json("Comment Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
        else {
            data.comments.push(req.body.new_comments)
            data.save().then(() => {
                res.json("Comment Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
    })
});

router.post('/save-like-id/:id', (req, res) => {
    const id = req.params.id;
    Comment.findOne({ offerID: id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            var new_comment = new Comment({ offerID: id });

            new_comment.userLikes.push(req.body);
            new_comment.save().then(() => {
                res.json("Like Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
        else {
            var pre_like = data.userLikes.findIndex(el => el.userID === req.body.userID);
            if (pre_like !== -1) {
                data.userLikes[pre_like].like = req.body.like;
            } else {
                data.userLikes.push(req.body);
            }
            data.save().then(() => {
                res.json("Like Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
    })
});

router.post('/save-favo-id/:id', (req, res) => {
    const id = req.params.id;
    Comment.findOne({ offerID: id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            var new_comment = new Comment({ offerID: id });

            new_comment.userFavos.push(req.body);
            new_comment.save().then(() => {
                res.json("Like Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
        else {
            var pre_like = data.userFavos.findIndex(el => el.userID === req.body.userID);
            if (pre_like !== -1) {
                data.userFavos[pre_like].favo = req.body.favo;
            } else {
                data.userFavos.push(req.body);
            }
            data.save().then(() => {
                res.json("Like Data appended!");
            }).catch(function (error) {
                console.log("[Error] " + error);
            })
        }
    })
});

router.post('/get-user-by-lineID', (req, res) => {
    User.findOne({ lineID: req.body.lineID }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            const newUser = new User({
                lineID: req.body.lineID,
                displayName: req.body.displayName,
                userImage: req.body.userImage,
            })
            newUser.save().then(
                function (updatedDoc, err) {
                    if (err) {
                        console.log(err);
                        res.json(null);
                    } else {
                        res.json(updatedDoc);
                    }
                }
            );
        }
        else {
            res.json(data);
        }
    })
});

router.post('/get-offer-by-id-and-type', (req, res) => {
    const id = req.body.id;
    const type = req.body.type;
    OfferData.findOne({ _id: new mongoose.Types.ObjectId(id) }, (err1, offerdata) => {
        if (err1) {
            console.log(err1);
        }
        else if (!offerdata) {
            OfferDataDigital.findOne({ _id: new mongoose.Types.ObjectId(id) }, (err2, offerdatanalog) => {
                if (err2) {
                    console.log(err2);
                }
                else if (!offerdatanalog) {
                    OfferDataAnalog.findOne({ _id: new mongoose.Types.ObjectId(id) }, (err3, offerdadigital) => {
                        if (err3) {
                            console.log(err3);
                        }
                        else if (!offerdadigital) {
                            console.log(`[ERROR] <get-offer-by-id-and-type> DATA NOT FOUND! ID: ${id}`);
                            res.json(null);
                        }
                        else {
                            res.json(offerdadigital);
                        }
                    })
                }
                else {
                    res.json(offerdatanalog);
                }
            })
        }
        else {
            res.json(offerdata);
        }
    })
});

router.post('/get-offer-post-by-id-and-type', (req, res) => {
    const id = req.body.id;
    const type = req.body.type;
    OfferPost.findOne({ offerID: id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            // console.log("[ERROR] <get-offer-post-by-id-and-type> DATA NOT FOUND!");
            res.json(null);
        }
        else {
            res.json(data);
        }
    })
});

router.get('/delete-offer-id/:id', (req, res) => {
    const offerID = req.params.id;
    Offer.deleteOne({ offerID: offerID }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    })
});

module.exports = router;