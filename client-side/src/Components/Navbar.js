import React from 'react';
import { Route } from 'react-router-dom'
import {
    BrowserRouter as Router,
    Switch,
    Link
} from "react-router-dom";

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

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {ImageListItem} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import Axios from 'axios';
// import NotificationMenu from "./NotificationMenu";
// import NotificationCenter from 'react-notification-center-component';
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from "react-router-dom";
import {roleToDisplay} from "./HardCode";
// import NotifyMe from 'react-notification-timeline';


const drawerWidth = '20%';

const useStyles = makeStyles((theme) => ({
    notificationMenu : {
        // alignItems: 'center',
        width: '30%',
        height: '70%',
        marginLeft: 'auto',
        marginRight: '3%',
        // zIndex: 9,
        // marginRight: 'auto',
        // position: "absolute",
        // paddingLeft: '20%',
        // backgroundPosition: 'center',
        backgroundColor: 'white',
        borderWidth: 10,
        borderRadius: 5,
        borderBlockEndColor: 'black',
        overflow: 'scroll'
    },
    root2:{
        height: '100vh',
        overflow: "scroll"
    },

    root: {
        display: 'flex',
        // overflow: 'scroll'
    },
    mailIcon: {
        marginLeft: 'auto'
    },
    notificationIcon : {
        // marginLeft: 'auto',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#022742',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // backgroundColor: '#916BBF'

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        // backgroundColor: '#916BBF'
    },
    drawerPaper: {
        width: drawerWidth,
        // backgroundColor: '#916BBF'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',

    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        // backgroundColor: '#916BBF'

    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        // backgroundColor: '#916BBF'
    },
    card:{
        border: 'solid',
        borderRadius: 2,
        borderWidth: 0.5,
        textAlign: 'left',
        paddingTop: '2%'

    },
    heading: {

        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Times New Roman',
    },
    notificationDiv: {
        marginLeft: 'auto',
        height: 25,
        width: 25,
    },
    notification:{

        paddingRight: 60,
        color: 'white',
        marginRight: 70

    },
    userrole:{
        fontSize: 18,
        marginRight: "auto",
        marginLeft: '5%'
    }
}));

export default function PersistentDrawerLeft(props) {
    const history = useHistory();
    const urlParams = props.match.params;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openNotification, setNotificationOpen] = React.useState(false);
    const [showCount, setShowCount] = React.useState(false);
    const [messageCount, setMessageCount] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const [target, setTarget] = React.useState(null);
    const [readIndex, setReadIndex] = React.useState(0);








    function notif(){
        return(
            <div className={classes.notificationMenu}>
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
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenNotification = () => {
        setNotificationOpen(true);
        return notif();
    }
    const handleCloseNotification = () => {
        setNotificationOpen(false)
    }
    const data =[
        {
            "update" : 'Lorem ipsum dolor sit amet.',
            "timestamp" :1596119688264
        },
        {
            "update" : 'hello bro.',
            'timestamp':1596119688264
        }
    ]


    function handleSignOut() {
        Axios.delete('http://localhost:3001/api/v1/auth/logout', {});
    }

    function getField(field) {
        const element = (
            <ListItem button key={field.key} onClick={() => props.history.push(field.pushPath)}>
                <ListItemIcon>{field.component}</ListItemIcon>
                {/*<ListItemIcon>{<InboxIcon/>}</ListItemIcon>*/}
                <ListItemText primary={field.primary} />
            </ListItem>
        );
        return element;
    }



    function renderFields(fieldsList) {
        const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
            <a
                href=""
                ref={ref}
                onClick={e => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
                <NotificationsIcon> </NotificationsIcon>
                &#x25bc;
                {children}
            </a>
        ));
        const element = (
            <div>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                {props.active}
                            </Typography>
                            <Badge color="primary" variant="dot" className={classes.mailIcon}>
                                {/*<NotificationsIcon />*/}
                                {/*<NotificationMenu/>*/}
                                {/*        {notif()}*/}
                                {/*<div className={classes.notificationDiv}>*/}
                                {/*    <Notifications data={data}/>*/}
                                {/*</div>*/}
                                {/*    <NotificationCenter className="myCustomClass" ></NotificationCenter>*/}


                                <Dropdown >
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" as={CustomToggle}>

                                    </Dropdown.Toggle>


                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {history.push('/report/uploadfile') }}>The Deadline to submit report is tomorrow.</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Your report has been reviewed</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </Badge>


                        </Toolbar>

                    </AppBar>

                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <div className={classes.userrole}>
                                {roleToDisplay[props.userrole]}
                            </div>

                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>

                        </div>
                        <Divider />
                        <List>
                            {/*{['Home', 'Report', 'Profile'].map((text, index) => (*/}
                            {
                                fieldsList.map((value) => {
                                    return getField(value);
                                })
                            }
                            {/*))}*/}
                        </List>
                        <Divider />
                        <List>
                            <ListItem button key="Sign Out" onClick={() => {
                                handleSignOut();
                                props.user.status = false;
                                props.history.push('/login');
                            }}>
                                <ListItemIcon>{<ExitToAppIcon/>}</ListItemIcon>
                                <ListItemText primary="Sign Out" />
                            </ListItem>

                        </List>
                    </Drawer>
                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />

                    </main>

                </div>
                {/*<div className={classes.root2}>*/}
                {/*    {notif()}*/}
                {/*</div>*/}

            </div>


        );
        return element;
    }
    return renderFields(navbarFields[props.user.role]);
}