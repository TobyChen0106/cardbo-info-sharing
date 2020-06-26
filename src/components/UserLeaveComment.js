import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import ReactTimeAgo from 'react-time-ago'
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const useStyles = (theme) => ({
    previewHolder: {
        display: "flex"
    },
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
        paddingTop: '20%',
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
        paddingLeft: "5%",
        paddingRight: "5%",
        fontFamily: 'cwTeXYen, sans-serif',
        fontSize: '1rem',
    },
});

class UserLeaveComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSendButton: "collapse"
        }
    }

    hadleInputChange = (e) => {
        if (e.target.value) {
            this.setState({ openSendButton: "visible" })
        }else{
            this.setState({ openSendButton: "collapse" })
        }
    }

    handleSend = () =>{
        var text_field = document.getElementById("standard-textarea");
        this.props.handleSendCommend(text_field.value);
        text_field.value = "";
        this.setState({ openSendButton: "collapse" });
    }

    render() {
        const { classes } = this.props;

        const TooltipContainer = ({ verboseDate, children, ...rest }) => (
            <Tooltip {...rest} title={verboseDate} arrow>
                {children}
            </Tooltip>
        )
        return (
            <>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="U" src={this.props.userImage} />
                    </ListItemAvatar>
                    <TextField
                        id="standard-textarea"
                        // label="Multiline Placeholder"
                        placeholder={`${this.props.userName}，寫下你的想法!`}
                        multiline
                        fullWidth
                        margin="normal"
                        onChange={(e) => this.hadleInputChange(e)}
                    />
                    <IconButton aria-label="delete" style={{visibility:this.state.openSendButton}} onClick={this.handleSend}>
                        <SendIcon />
                    </IconButton>
                </ListItem >
                <Divider />
            </>
        )
    }
}
export default withStyles(useStyles)(UserLeaveComment)