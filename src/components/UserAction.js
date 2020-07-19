import React, { Component } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

import Icon from '@material-ui/core/Icon';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { blue, pink, grey } from '@material-ui/core/colors';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbUpBorder from '@material-ui/icons/ThumbUpOutlined';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbDownBorder from '@material-ui/icons/ThumbDownOutlined';
import ShareIcon from '@material-ui/icons/Share';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ReactTimeAgo from 'react-time-ago'
import Tooltip from '@material-ui/core/Tooltip';

import "./UserAction.css"
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";

const useStyles = (theme) => ({
    root: {
        // width: "100%",
    },

    button: {
        fontWeight: "100",
        fontSize: "20px"
    },
    checkboxLabel: {
        fontSize: "0.8rem",
    },
    collapse: {
        width: "100%",
    },
    commentTextArea: {
        marginTop: "5px",
        marginBottom: "5px",
        padding: "5%",
        width: "90%",
        fontSize: "1rem",
        border: "1px solid",
        borderRadius: "5px",
        borderColor: "#666"
    },
    labelText: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    actionHolder: {
        display: "flex",
        justifyContent: "space-between"
    },
    actionQuater: {
        // width: "25vw"
    }
});

class UserAction extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    convertNum = (num) => {
        return Math.abs(num) > 99999 ? Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + 'M' : Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num)
    }

    handleLikeChange = (event) => {
        event.preventDefault();
        this.props.userAddToLike();
    }
    handleDisLikeChange = (event) => {
        event.preventDefault();
        this.props.userAddToDislike();
    }

    handleFavoChange = (event) => {
        event.preventDefault();
        this.props.userAddToFavo();
    }

    render() {
        const { classes } = this.props;
        const LikeCheckbox = withStyles({
            root: {
                color: grey[500],
                '&$checked': {
                    color: blue[600],
                },
            },
            checked: {},
        })((props) => <Checkbox color="default" {...props} />);
        const ShareCheckbox = withStyles({
            root: {
                color: grey[500],
                '&$checked': {
                    color: grey[500],
                },
            },
            checked: {},
        })((props) => <Checkbox color="default" {...props} />);
        const FavoCheckbox = withStyles({
            root: {
                color: grey[500],
                '&$checked': {
                    color: pink[600],
                },
            },
            checked: {},
        })((props) => <Checkbox color="default" {...props} />);
        return (
            <>
                <div className={classes.actionHolder}>
                    <div className={classes.actionQuater} onClick={(event) => this.handleLikeChange(event)}>
                        <div className={classes.labelText}>
                            <FormControlLabel
                                label={`${this.convertNum(this.props.num_likes)}`}
                                labelPlacement="bottom"
                                classes={{
                                    label: classes.checkboxLabel
                                }}
                                control={<LikeCheckbox icon={<ThumbUp style={{ fontSize: 30 }} />} checkedIcon={<ThumbUp style={{ fontSize: 30 }} />} name="checkedLike" checked={this.props.like_checked} />}
                            />
                        </div>
                    </div>
                    <div onClick={(event) => this.handleDisLikeChange(event)}>
                        <FormControlLabel
                            label={`${this.convertNum(this.props.num_dislikes)}`}
                            labelPlacement="bottom"
                            classes={{
                                label: classes.checkboxLabel
                            }}
                            control={<LikeCheckbox icon={<ThumbDown style={{ fontSize: 30 }} />} checkedIcon={<ThumbDown style={{ fontSize: 30 }} />} name="checkedLike" checked={this.props.dislike_checked} />}
                        />
                    </div>
                    <LineShareButton url={"https://share.cardbo.info/?id="+this.props.id}>
                        <FormControlLabel
                            label="分享"
                            labelPlacement="bottom"
                            classes={{
                                label: classes.checkboxLabel
                            }}
                            control={<ShareCheckbox icon={<ShareIcon style={{ fontSize: 30 }} />} checkedIcon={<ShareIcon style={{ fontSize: 30 }} />} name="checkedLike" />}
                        />
                    </LineShareButton>
                    <div onClick={(event) => this.handleFavoChange(event)}>
                        <FormControlLabel
                            label={`收藏`}
                            labelPlacement="bottom"
                            classes={{
                                label: classes.checkboxLabel
                            }}
                            control={<FavoCheckbox icon={<Favorite style={{ fontSize: 30 }} />} checkedIcon={<Favorite style={{ fontSize: 30 }} />} name="checkedFavo" checked={this.props.favo_checked} />}
                        />
                    </div>
                </div>
            </>
        )
    }
}
export default withStyles(useStyles)(UserAction)