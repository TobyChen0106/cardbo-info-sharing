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

router.post('/save-like-by-lineID', (req, res) => {
    //req.body.lineID
    //req.body.offerID
    //req.body.like
    //req.body.dislike
    OfferPost.findOne({ offerID: new mongoose.Types.ObjectId(req.body.offerID) }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            const newOfferPost = new OfferPost({ offerID: new mongoose.Types.ObjectId(req.body.offerID) })
            if (req.body.like) {
                newOfferPost.likes = [req.body.lineID];
                newOfferPost.dislikes = [];

            }
            if (req.body.dislike) {
                newOfferPost.dislikes = [req.body.lineID];
                newOfferPost.likes = [];
            }

            newOfferPost.save().then(
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
            var index = data.likes.findIndex(f => String(f) === req.body.lineID);
            if (index > -1) {
                if (!req.body.like) {
                    data.likes.splice(index, 1);
                }
            } else {
                if (req.body.like) {
                    data.likes.push(req.body.lineID);
                }
            }
            index = data.dislikes.findIndex(f => String(f) === req.body.lineID);
            if (index > -1) {
                if (!req.body.dislike) {
                    data.dislikes.splice(index, 1);
                }
            } else {
                if (req.body.dislike) {
                    data.dislikes.push(req.body.lineID);
                }
            }

            data.save().then((updatedDoc, err) => {
                if (err) {
                    console.log(err);
                    res.json(null);
                } else {
                    res.json(updatedDoc);
                }
            });
        }
    })
});

router.post('/save-favo-by-lineID', (req, res) => {
    User.findOne({ lineID: req.body.lineID }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            const newUser = new User({
                lineID: req.body.lineID,
            })
            if (req.body.favo) {
                newUser.favos = [req.body.offerID]
            }
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
        else if (data.favos.length > 0) {
            const index = data.favos.findIndex(f => String(f) === req.body.offerID);
            if (index > -1) {
                if (req.body.favo === false) {
                    data.favos.splice(index, 1);
                }
            } else {
                if (req.body.favo) {
                    data.favos.push(req.body.offerID);
                }
            }
            data.save().then((updatedDoc, err) => {
                if (err) {
                    console.log(err);
                    res.json(null);
                } else {
                    res.json(updatedDoc);
                }
            });
        } else {
            res.json(null);
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