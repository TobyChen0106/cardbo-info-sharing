import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import ReactTimeAgo from 'react-time-ago'
import Tooltip from '@material-ui/core/Tooltip';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import "./UserComment.css"


const useStyles = (theme) => ({
    root: {
        width: "100%",
        height: "100%",
        maxWidth: "100vw",
        fontFamily: 'cwTeXYen, sans-serif',
    },
    header: {
        display: 'flex',
        fontFamily: 'cwTeXYen, sans-serif',
        justifyContent: 'space-between',
    },
    avatarTitle: {
        display: 'flex',
        width: 'auto',
        height: '5rem',

    },
    avatar: {
        width: '3rem',
        height: '3rem',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
    },
    titleHolder: {
        width: '100%',
        height: '100%',
        marginTop: '1rem',
    },
    title: {
        fontFamily: 'cwTeXYen, sans-serif',
        fontSize: '1.2rem',
    },
    subtitle: {
        fontFamily: 'cwTeXYen, sans-serif',
        fontSize: '0.8rem',
        color: '#777',
        borderBottom: "1px dotted"
    },
    content: {
        wordWrap: "break-word",
        paddingRight: "5%",
        whiteSpace: "pre-line",
    },
    inline: {
        display: 'inline',
    },
});

class UserComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openTimeToolTip: false
        }
    }

    setTimeToolTip = () => {
        this.setState({ openTimeToolTip: true });
        setTimeout(function () { this.setState({ openTimeToolTip: false }) }.bind(this), 1500);
    }

    render() {
        const { classes } = this.props;

        const TooltipContainer = ({ verboseDate, children, ...rest }) => (
            <Tooltip {...rest} title={verboseDate} arrow>
                {children}
            </Tooltip>
        )
        return (

            // <Card className={classes.root}>
            //     <div className={classes.header}>
            //         <div className={classes.avatarTitle} onClick={this.onclickAvatar}>
            //             <Avatar className={classes.avatar} src={this.props.userImage} />

            //             <div className={classes.titleHolder}>
            //                 <div className={classes.subtitle} onClick={this.setTimeToolTip}>
            //                     {`${this.props.userName}‧`}
            //                     <ReactTimeAgo date={this.props.time} container={TooltipContainer} tooltip={false} open={this.state.openTimeToolTip} />
            //                 </div>
            //                 <div className={classes.title}>
            //                     {`${this.props.content}`}
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </Card>
            <>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="U" src={this.props.userImage} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {`${this.props.userName} ‧ `}
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.subtitle}
                                    onClick={this.setTimeToolTip}
                                    color="textPrimary"
                                >
                                    <ReactTimeAgo date={this.props.time} container={TooltipContainer} tooltip={false} open={this.state.openTimeToolTip} />
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <Typography
                                component="span"
                                variant="body1"
                                className={classes.content}
                                color="textPrimary"

                            >
                                {`${this.props.content}`}
                            </Typography>
                        }
                    />
                    <div className={classes.moreVertIcon}>
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </ListItem>
                <Divider />
            </>
        )
    }
}
export default withStyles(useStyles)(UserComment)