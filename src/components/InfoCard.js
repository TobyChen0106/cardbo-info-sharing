import React, { Component } from 'react'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ContentMarkdown from './ContentMarkdown';
import { NavLink, BrowserRouter } from "react-router-dom";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import "./InfoCard.css"


const useStyles = (theme) => ({

    root: {
        width: '22rem',
        maxWidth: "50vw",
        fontFamily: "cwTeXYen",
        margin: "0.5rem",
        position: 'relative',
        
    },
    avatar: {
        backgroundColor: "#0058a3"
    },
    content: {
        paddingTop: 0,
        paddingBottom: 0,
        fontFamily: "cwTeXYen",
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: "cwTeXYen",
    },
    mainInfo: {
        width: '50%',
    },
    subInfo: {
        width: '50%',
    },
    textOverflow: {
        width:'100%',
        'text-overflow': 'ellipsis',
        'overflow': 'hidden', 
    },

});

class InfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            setExpanded: false,
            offerID: this.props.offerID,
            offerName: this.props.offerName,
            cardID: this.props.cardID,
            cardName: this.props.cardName,
            // expiration: this.props.expiration,
            beginDate: this.props.expiration.beginDate,
            endDate: this.props.expiration.endDate,

            offerAbstract: this.props.offerAbstract,
            category: this.props.category,
            tags: this.props.tags,
            numSearch: this.props.numSearch,
            // reward: this.props.reward,
            timingToOffer: this.props.reward.timingToOffer,
            limits: this.props.reward.limits,
            contents: this.props.reward.contents,
            notes: this.props.reward.notes,

            // constraint: this.props.constraint,
            userIdentity: this.props.constraint.userIdentity,
            timingOfConsumption: this.props.constraint.timingOfConsumption,
            numberOfConsumption: this.props.constraint.numberOfConsumption,
            type: this.props.constraint.type,
        }
    }

    handleExpandClick = () => {
        this.setState((preState) => ({ expanded: !preState.expanded }));
        // setExpanded(!expanded);
    };

    handleTextareaChange = (changedState) => {
        this.setState(changedState);
    }

    settingOnClick = (event)=>{
        event.preventDefault();
        console.log('settingOnClick');
    }
    onSave = () => {
        this.props.onSave(
            {
                offerID: this.state.offerID,
                offerName: this.state.offerName,
                cardID: this.state.cardID,
                cardName: this.state.cardName,

                beginDate: this.state.beginDate,
                endDate: this.state.endDate,

                offerAbstract: this.state.offerAbstract,
                category: this.state.category,
                tags: this.state.tags,
                numSearch: this.state.numSearch,

                contents: this.state.contents,
                limits: this.state.limits,
                timingToOffer: this.state.timingToOffer,
                notes: this.state.notes,


                userIdentity: this.state.constraint,
                timingOfConsumption: this.state.timingOfConsumption,
                numberOfConsumption: this.state.numberOfConsumption,
                type: this.state.type,

            }
        );
    }
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root} >
                <CardHeader
                    action={
                        <IconButton aria-label="settings" onClick={this.settingOnClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    titleTypographyProps={{ variant: 'body1' }}
                    title={this.props.offerName}
                    subheaderTypographyProps={{ variant: 'body2' }}
                    subheader={this.props.offerAbstract}
                />
                <CardContent className={classes.content}>
                    <div className={classes.contentContainer}>
                        <div className={classes.mainInfo}>
                            <Typography  variant="body2" color="textSecondary" component="p" >
                                {`${this.props.offerID}`}
                            </Typography>
                            <Typography className={classes.textOverflow} variant="body2" color="textSecondary" component="p">
                                {`${this.props.cardName}`}
                            </Typography>

                        </div>
                        <div className={classes.subInfo}>
                            <Typography className={classes.textOverflow} variant="body2" color="textSecondary" component="p" align="right">
                                {`${this.props.numSearch} 次搜尋`}
                            </Typography>
                            <Typography className={classes.textOverflow} variant="body2" color="textSecondary" component="p" align="right">
                                {`${this.props.category}`}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p"  align="left">
                        {`${this.props.expiration.beginDate} - ${this.props.expiration.endDate}`}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}
export default withStyles(useStyles)(InfoCard)