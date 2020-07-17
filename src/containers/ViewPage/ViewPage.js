import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import ContentMarkdown from '../../components/ContentMarkdown';

import "./InfoCard.css"
import ReactLoading from 'react-loading';
import UserComment from '../../components/UserComment';
import UserLeaveComment from '../../components/UserLeaveComment';
import UserAction from '../../components/UserAction';
import axios from 'axios';

// Liff
const liff = window.liff;

const useStyles = (theme) => ({
    editorContainer: {

    },
    root: {
        width: "100vw",
        minHeight: "100vh",
        fontFamily: "cwTeXYen",
    },
    contentHolder: {
        margin: "5vw",
    },
    actionHolder: {
        padding: "5vw",
    },
    commentHolder: {
        padding: "5vw",
    }
});

class ViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            OS: undefined,
            loading_offer: true,
            loading_user: true,
            loading_comment: true,

            userData: {
                displayName: "",
                lineID: "",
                userImage: "",
                favos: []
            },

            offerData: {
                offerID: "",
                offerName: "",
                contents: "",
            },
            offerPost: {
                comments: [],
                likes: [],
                dislikes: [],
                views: 0,
            },
            offerPostComments: [],
            validData: false,
        }
    }

    componentWillMount = () => {
        const params = new URLSearchParams(this.props.location.search);
        const id = params.get('id');
        const type = params.get('type');

        this.setState({
            id: id,
            type: type
        })

        liff.init({ liffId: '1654394004-OGgr6yb8' }).then(() => {
            if (!liff.isLoggedIn()) {
                liff.login({ redirectUri: (`https://share.cardbo.info/?id=${id}?type=${type}`) });
            }
        }).then(
            () => liff.getOS()
        ).then(
            (OS) => { this.setState({ OS: OS }) }
        ).then(
            () => liff.getProfile()
        ).then((profile) => {
            if (!profile.userId) {
                console.log("USER ID ERROR!");
            } else {
                axios.post('/api/get-user-by-lineID', {
                    lineID: profile.userId,
                    displayName: profile.displayName,
                    userImage: profile.pictureUrl,
                }).then((res) => {
                    if (res.data) {
                        this.setState({ userData: res.data });
                    }
                    this.setState({ loading_user: false })
                })

                axios.post('/api/get-offer-by-id-and-type', {
                    id: id,
                    type: type
                }).then((res) => {
                    if (res.data) {
                        this.setState({ offerData: res.data, validData: true });
                    }
                    this.setState({ loading_offer: false });
                })

                axios.post('/api/get-offer-post-by-id-and-type', {
                    id: id,
                    type: type
                }).then((res) => {
                    if (res.data) {
                        this.setState({ offerPost: res.data, offerPostComments: res.data.comments.sort((a, b) => b.time - a.time), loading_comment: false }, () => {
                            for (var i = 0; i < res.data.comments.length; ++i) {
                                axios.post('/api/get-user-by-lineID', {
                                    lineID: res.data.comments[i].lineID,
                                }).then((res2) => {
                                    if (res2.data) {
                                        this.setState(prevState => {
                                            const list = prevState.offerPostComments.map((item, j) => {
                                                if (j === i) {
                                                    item.displayName = res2.data.displayName;
                                                    item.userImage = res2.data.userImage;
                                                    item.time = new Date(item.time)
                                                    return item;
                                                } else {
                                                    return item;
                                                }
                                            });
                                            return {
                                                offerPostComments: list,
                                            };
                                        });
                                    }
                                })
                            }
                        });
                    } else {
                        this.setState({ loading_comment: false })
                    }
                })
            }
        })
    }

    userAddToFavo = () => {
        var new_userComment = this.state.userComment;
        new_userComment.favo = !new_userComment.favo;
        this.setState({
            userComment: new_userComment
        })

        fetch('/api/save-favo-id/' + this.state.id, {
            method: 'POST',
            body: JSON.stringify({
                lineID: this.state.userData.userID,
                favo: new_userComment.favo
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).catch(function (error) {
            console.log("[Error] " + error);
        })
    }

    userAddToLike = () => {
        var new_userComment = this.state.userComment;
        var new_commentLikes = this.state.commentLikes;
        var new_like = null;

        if (new_userComment.like === true) {
            new_userComment.like = null;
            new_commentLikes.num_likes--;

            this.setState({
                userComment: new_userComment,
                commentLikes: new_commentLikes
            });
        } else {
            new_like = true;
            if (new_userComment.like === false) {
                new_userComment.like = true;

                new_commentLikes.num_likes++;
                new_commentLikes.num_dislikes--;

                this.setState({
                    userComment: new_userComment,
                    commentLikes: new_commentLikes
                })
            } else {
                new_userComment.like = true;

                new_commentLikes.num_likes++;

                this.setState({
                    userComment: new_userComment,
                    commentLikes: new_commentLikes
                })
            }
        }

        //fetch
        fetch('/api/save-like-id/' + this.state.id, {
            method: 'POST',
            body: JSON.stringify({
                lineID: this.state.userData.userID,
                like: new_like
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).catch(function (error) {
            console.log("[Error] " + error);
        })
    }

    userAddToDislike = () => {
        var new_userComment = this.state.userComment;
        var new_commentLikes = this.state.commentLikes;
        var new_like = null;

        if (new_userComment.like === false) {
            new_userComment.like = null;
            new_commentLikes.num_dislikes--;

            this.setState({
                userComment: new_userComment,
                commentLikes: new_commentLikes
            });

        } else {
            new_like = false;
            if (new_userComment.like === true) {
                new_userComment.like = false;

                new_commentLikes.num_likes--;
                new_commentLikes.num_dislikes++;

                this.setState({
                    userComment: new_userComment,
                    commentLikes: new_commentLikes
                })

            } else {
                new_userComment.like = false;
                new_commentLikes.num_dislikes++;

                this.setState({
                    userComment: new_userComment,
                    commentLikes: new_commentLikes
                })

            }
        }

        //fetch
        fetch('/api/save-like-id/' + this.state.id, {
            method: 'POST',
            body: JSON.stringify({
                lineID: this.state.userData.userID,
                like: new_like
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).catch(function (error) {
            console.log("[Error] " + error);
        })
        // .then(
        //     res => res.json()
        // )

    }

    handleSendCommend = (text) => {
        const d = new Date();
        const s = d.toISOString();

        this.setState(prevState => ({
            comments: [{
                displayName: prevState.userData.displayName,
                lineID: prevState.userData.userID,
                userImage: prevState.userData.userImage,
                content: text,
                showStatus: true,
                time: d
            },
            ...prevState.comments]
        }))

        fetch('/api/append-comment-id/' + this.state.id, {
            method: 'POST',
            body: JSON.stringify({
                new_comments: {
                    displayName: this.state.userData.displayName,
                    lineID: this.state.userData.userID,
                    userImage: this.state.userData.userImage,
                    content: text,
                    showStatus: true,
                    time: s
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).catch(function (error) {
            console.log("[Error] " + error);
        })
        // .then(
        //     res => res.json()
        // )
    }

    render() {
        const { classes } = this.props;
        if (this.state.loading_user || this.state.loading_offer || this.state.loading_comment) {
            return (
                <div className="my-loading">
                    <ReactLoading type={'spinningBubbles'} color={'#0058a3'} height={'5rem'} width={'5rem'} />
                </div>
            );
        }
        else if (!this.state.validData) {
            return (
                <div className={classes.root}>Data Not Found!</div>
            );
        }
        else {
            const like = this.state.offerPost.likes.find(l => l === this.state.userData.lineID) !== undefined;
            const dislike = this.state.offerPost.dislikes.find(l => l === this.state.userData.lineID) !== undefined;
            const favo = this.state.userData.favos.find(f => f === this.state.id) !== undefined;
            return (
                <div className={classes.root}>
                    <Card className={classes.contentHolder}>
                        <ContentMarkdown
                            title={this.state.offerData.OfferName}
                            subtitle={`優惠期間: ${this.state.offerData.BeginDate} - ${this.state.offerData.EndDate}`}
                            source={this.state.offerData.Content}
                            provider={`卡伯`}
                            skipHtml='skip'
                            escapeHtml='escape'
                        />
                        <UserAction
                            id={this.state.id}
                            num_likes={this.state.offerPost.likes.length}
                            num_dislikes={this.state.offerPost.dislikes.length}

                            like_checked={like}
                            dislike_checked={dislike}
                            favo_checked={favo}

                            userAddToFavo={this.userAddToFavo}
                            userAddToLike={this.userAddToLike}
                            userAddToDislike={this.userAddToDislike}
                        />
                    </Card>

                    <div className={classes.commentHolder}>
                        <UserLeaveComment
                            userName={this.state.userData.displayName}
                            userImage={this.state.userData.userImage}
                            handleSendCommend={this.handleSendCommend}
                        />
                    </div>

                    <div className={classes.commentHolder}>
                        {this.state.offerPostComments.map((i, index) => (
                            <UserComment
                                key={`comment-${index}`}
                                userName={i.displayName}
                                userImage={i.userImage}
                                content={i.content}
                                time={i.time}
                            />
                        ))}
                    </div>
                </div>
            )
        }
    }
}
export default withStyles(useStyles)(ViewPage)