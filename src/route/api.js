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

router.post('/append-comment-by-offerID', (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.body.offerID)) {
        OfferPost.findOne({ offerID: new mongoose.Types.ObjectId(req.body.offerID) }, (err, data) => {
            if (err) {
                console.log(err);
                res.json(null);
            }
            else if (!data) {
                const newOfferPost = new OfferPost({ offerID: new mongoose.Types.ObjectId(req.body.offerID) })
                newOfferPost.comments = [req.body.new_comment];
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
                var pushedIndex = data.comments.push(req.body.new_comment) - 1;
                data.save().then((updatedDoc, err) => {
                    if (err) {
                        console.log(err);
                        res.json(null);
                    } else {
                        res.json(data.comments[pushedIndex]);
                    }
                });
            }
        })
    } else {
        res.json(null);
    }
});

router.post('/save-like-by-lineID', (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.body.offerID)) {
        OfferPost.findOne({ offerID: new mongoose.Types.ObjectId(req.body.offerID) }, (err, data) => {
            if (err) {
                console.log(err);
                res.json(null);
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
    } else {
        res.json(null);
    }
});

router.post('/save-favo-by-lineID', (req, res) => {
    User.findOne({ lineID: req.body.lineID }, (err, data) => {
        if (err) {
            console.log(err);
            res.json(null);
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
        else {
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
        }
    })
});

router.post('/get-user-by-lineID', (req, res) => {
    User.findOne({ lineID: req.body.lineID }, (err, data) => {
        if (err) {
            console.log(err);
            res.json(null);
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

router.post('/get-comment-user-by-lineID', (req, res) => {
    User.findOne({ lineID: req.body.lineID }, (err, data) => {
        if (err) {
            console.log(err);
            res.json(null);
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
                        res.json({ user: updatedDoc, index: req.body.index });
                    }
                }
            );
        }
        else {
            res.json({ user: data, index: req.body.index });
        }
    })
});

router.post('/get-offer-by-id-and-type', (req, res) => {
    const id = req.body.id;
    const type = req.body.type;
    if (mongoose.Types.ObjectId.isValid(id)) {
        OfferData.findOne({ _id: new mongoose.Types.ObjectId(id) }, (err1, offerdata) => {
            if (err1) {
                console.log(err1);
                res.json(null);
            }
            else if (!offerdata) {
                OfferDataDigital.findOne({ _id: new mongoose.Types.ObjectId(id) }, (err2, offerdatanalog) => {
                    if (err2) {
                        console.log(err2);
                        res.json(null);
                    }
                    else if (!offerdatanalog) {
                        OfferDataAnalog.findOne({ _id: new mongoose.Types.ObjectId(id) }, (err3, offerdadigital) => {
                            if (err3) {
                                console.log(err3);
                                res.json(null);
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
    } else {
        res.json(null);
    }
});

router.post('/get-offer-post-by-id-and-type', (req, res) => {
    const id = req.body.id;
    const type = req.body.type;
    if (mongoose.Types.ObjectId.isValid(id)) {
        OfferPost.findOne({ offerID: new mongoose.Types.ObjectId(id) }, (err, data) => {
            if (err) {
                console.log(err);
                res.json(null);
            }
            else if (!data) {
                // console.log("[ERROR] <get-offer-post-by-id-and-type> DATA NOT FOUND!");
                res.json(null);
            }
            else {
                res.json(data);
            }
        })
    } else {
        res.json(null);
    }
});

router.post('/delete-comment-by-offerID-and-commentID', (req, res) => {
    const id = req.body.offerID;
    const commentID = req.body.commentID;

    if (mongoose.Types.ObjectId.isValid(id)) {
        OfferPost.findOne({ offerID: new mongoose.Types.ObjectId(id) }, (err1, offerpost) => {
            if (err1) {
                console.log(err1);
                res.json(null);
            }
            else if (!offerpost) {
                res.json(null);
            }
            else {
                for (var i = 0; i < offerpost.comments.length; ++i) {
                    if (String(offerpost.comments[i]._id) === String(commentID)) {
                        if (offerpost.comments[i].lineID === req.body.lineID) {
                            offerpost.comments[i].showStatus = false;
                            offerpost.save().then(
                                function (updatedDoc, err) {
                                    if (err) {
                                        console.log(err);
                                        res.json(null);
                                    } else {
                                        res.json(updatedDoc);
                                    }
                                }
                            );
                            return;
                        }
                    }
                }
                res.json(null);
            }
        })
    } else {
        res.json(null);
    }
});

module.exports = router;