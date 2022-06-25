import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import {navbarFields} from "./HardCode";
import Notifications from "react-notifications-menu";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';

import {ImageListItem} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({


    main : {
        alignItems: 'center',

        width: '30%',
        height: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        // position: "absolute",
        // paddingLeft: '20%',
        // backgroundPosition: 'center',
        backgroundColor: '#3DADA9',
        borderWidth: 10,
        borderRadius: 5,
        borderBlockEndColor: 'black',
        overflow: 'scroll'
    },

    root: {
        // height: '100vh',
        backgroundColor: '#3DADA9',

    },
    createAccount : {
        alignItems: 'center',

        width: '30%',
        height: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        // position: "absolute",
        // paddingLeft: '20%',
        // backgroundPosition: 'center',
        backgroundColor: 'white',
        borderWidth: 10,
        borderRadius: 10,
        borderBlockEndColor: 'black'
    },
    heading: {
        color: 'white',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Times New Roman'
    },
    textField :{
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: '5%',
        paddingTop: '5%'

    },
    // textField1 :{
    //     padding: '5%',
    // },
    button: {
        // al
        paddingLeft: '5%',
        paddingTop: '5%'
    },


}));
function NotificationMenu(){

    const classes = useStyles()

    function notif(){
        return(
            <div className={classes.main}>
                <div className={classes.heading}>
                    Notifications
                </div>
                <div>
                    <Stack spacing={2} sx={{ maxWidth: 600 }}>
                        <SnackbarContent message="I love snacks."  />
                        <SnackbarContent
                            message={
                                'I love candy. I love cookies. I love cupcakes. \
                                I love cheesecake. I love chocolate.'
                            }
                        />
                        <SnackbarContent
                            message="I love candy. I love cookies. I love cupcakes."

                        />
                        <SnackbarContent
                            message={
                                'I love candy. I love cookies. I love cupcakes. \
                                I love cheesecake. I love chocolate.'
                            }

                        />
                        <SnackbarContent
                            message={
                                'I love candy. I love cookies. I love cupcakes. \
                                I love cheesecake. I love chocolate.'
                            }

                        />
                        <SnackbarContent
                            message={
                                'I love candy. I love cookies. I love cupcakes. \
                                I love cheesecake. I love chocolate.'
                            }

                        />
                        <SnackbarContent
                            message={
                                'I love candy. I love cookies. I love cupcakes. \
                                I love cheesecake. I love chocolate.'
                            }

                        />
                        <SnackbarContent
                            message={
                                'I love candy. I love cookies. I love cupcakes. \
                                I love cheesecake. I love chocolate.'
                            }

                        />
                    </Stack>

                </div>

            </div>
        )

    }
    return(
        <div>
            {notif()}
        </div>
    )
}

export default NotificationMenu;