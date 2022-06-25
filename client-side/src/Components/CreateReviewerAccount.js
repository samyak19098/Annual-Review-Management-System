import React, {Component, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import '@fontsource/roboto'
import {InputAdornment, makeStyles, Snackbar, TextField, Tooltip} from "@material-ui/core";
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Box from '@material-ui/core/Box';
import {Label} from "@material-ui/icons";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogBox from './Dialog'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {emailTemplates} from "./HardCode";
import background from "../images/new1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@material-ui/core/IconButton";
import generator from 'generate-password';
import mailer from 'emailjs-com';
import{ init } from 'emailjs-com';
import {Alert, AlertTitle} from "@mui/lab";
import createAccountImage from '../images/createAccount.png';
import CreateIcon from '@mui/icons-material/Create';
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

init("user_ic2EamjeWo1KypweBULA2");

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        // backgroundColor: 'white',
        backgroundSize: 'cover',
        position: 'absolute',
        // overflow:'scroll'
        // backgroundImage: `url(${background})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundColor:
        //     theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        // backgroundSize: "100% 100%",
        // backgroundPosition: 'center-fixed',
        // paddingBottom: '10%'
    },
    image: {

        // backgroundColor: 'yellow',
        height: '200%',
        width: '100%',

    },
    profileDiv : {
        alignItems: 'center',
        marginTop: '3%',
        // backgroundColor: 'white',
        marginBottom: '10%',
        width: '85%',
        height: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        // display: "flex"
        // backgroundColor: 'white',






    },
    logo :{
        marginTop: '10%',
        backgroundRepeat: 'no-repeat',
        // backgroundColor: 'white',
        marginLeft: '10%',
        // backgroundPosition: 'center-fixed',
        height: "80%",
        width: "80%",


    },
    createAccount : {
        flex: 1,
        alignItems: 'center',
        // marginTop: '5%',
        width: '40%',
        height: '75%',
        marginLeft: 'auto',
        marginRight: '30%',
        marginTop: '10%',

        // position: "absolute",
        // paddingLeft: '20%',
        // backgroundPosition: 'center',
        // paddingTop: '10%',
        // backgroundColor: 'white',


    },
    heading: {
        color: '#032a73',
        paddingTop: '5%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        // fontFamily: 'Times New Roman'
    },
    textField :{
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: '5%',
        paddingTop: '5%'
    },
    textField1 :{
        width : '105%'
        // padding: '5%',
    },
    buttonDiv: {
        textAlign: "center",

        // paddingLeft: '40%',
        paddingTop: '5%'

    },

    button: {
        textAlign: "center",
        // backgroundColor: '#3D2C8D',
        // color: 'white',
        height: 60,
        width: 200,
        color : 'white',
        backgroundColor: '#3f51b5',
    },
    createButton: {
        textAlign: "center",
        backgroundColor: '#3f51b5',
        color : 'white',
        height: 60,
        width: 200


    }

}));
function CreateReviewerAccount(props){
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [templateDialogConfirmation, setTemplateDialogConfirmation] = useState(false);
    const [openAlert, setOpenAlert] = useState((false));
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
    const [messageTemplates, setMessageTemplates] = useState([])
    const defaultAccountDetails = {
        emailAddress : "",
        password : "",
        firstName : "",
        emailMessage : "",
    };

    const [user, setUser] = useState({status: false, id: -1});
    const [accountDetails, setAccountDetails] = useState(defaultAccountDetails);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAlertOpen = () => {
        setOpenAlert(true);
    };
    const handleAlertClose = () => {
        setOpenAlert(false);
    };
    const templateDialogConfirmationOpen = () => {
        setTemplateDialogConfirmation(true);
    };
    const templateDialogConfirmationClose = () => {
        setTemplateDialogConfirmation(false);
    };




    useEffect(() => {
        fetch(`http://localhost:3001/api/test`, {method: "get", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                setUser({status: false, id: data.userId})
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3001/api/messageTemplate`, {method: "get", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                console.log("i am here checking templates")
                setMessageTemplates(data.result)
                console.log(messageTemplates)
            });
    }, []);



    function handleChange(event) {
        event.persist();
        // console.log(event); // If there is no change happening, this won't be logged
        setAccountDetails({...accountDetails, [event.target.id]: event.target.value});
    }

    function createAccountButton(event) {
        handleClose()
        console.log("Creating Account");
        Axios.post("http://localhost:3001/api/createReviewerAccount", accountDetails)
            .then(res => {
                if(res.data == "Account Creation Success"){

                    var templateParams = {
                        to_email: accountDetails.emailAddress,
                        to_name: accountDetails.firstName,
                        message: accountDetails.emailMessage,
                        username: accountDetails.emailAddress,
                        password: accountDetails.password
                    };
                    mailer.send('service_pte39e7', 'template_bdc43qp', templateParams)
                        .then(function(response) {
                            console.log('SUCCESS!', response.status, response.text);
                            console.log("Reviewer account created successfully.");
                            setAccountDetails(defaultAccountDetails);
                            handleClose()
                            alert("Reviewer Account Created")
                        }, function(error) {
                            alert("Account created, error in sending email !")
                            console.log('FAILED...', error);
                        });
                }
                else{
                    console.log("Error! Reviewer account could not be created.");
                    alert("Account creation failed, please try again !");
                }
            })
    }

    function handleEmailDialogClose() {
        setEmailDialogOpen(false);
    }

    function setMessageText(template) {
        setEmailDialogOpen(false)
        setAccountDetails({...accountDetails, emailMessage: template.message});
    }

    function getTemplate(template) {
        const element = (
            <React.Fragment key={template.id}>
                <ListItem button key={template.id} onClick={() => (setMessageText(template))}>
                    <ListItemAvatar>
                        <Avatar>
                            <AssignmentIndIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={template.message}
                        secondary={template.subject}
                    />
                </ListItem>
                <Divider variant="inset" component="li"/>
            </React.Fragment>
        );
        return element;
    }
    // function handleChange(event) {
    //     event.persist();
    //     // console.log(event);
    //     const copy = {...};
    //     copy[event.target.name] = event.target.value;
    //     setFormValues(copy);
    //     console.log((formValues))
    // }
    function addToTemplates(event) {
        handleAlertOpen()
        Axios.post(`http://localhost:3001/api/addTemplate`, accountDetails)
            .then(res => {
                console.log(res);
                console.log("Here is");
                alert("New Message Template Added!")
            })
        templateDialogConfirmationClose()
    }

    function handleEmail(event) {
        setEmailDialogOpen(true);
    }

    function generatePassword() {
        var gen_password = generator.generate({
            length: 10,
            numbers:true,
            uppercase:true,
            lowercase:true
        });
        setAccountDetails({...accountDetails, password: gen_password});

    }

    return(
        <div className={classes.root}>
            <Navbar userrole={props.user.role} active="Create Reviewer Account" match={props.match} user={props.user} history={props.history}/>
            {/*<div className={classes.heading}>*/}
            {/*    Create New Reviewer Account*/}
            {/*</div>*/}
            <Grid container spacing={{ xs: 0, sm: 0, md: 0, lg: 0 }} >
                <Grid item xs={12} sm={12} md={5} key={0}>
                    <div >
                        <img src={createAccountImage} className={classes.logo} alt="Logo"/>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={7} key={1}>
                    <div className={classes.createAccount}>
                        <div className={classes.heading}>
                            Create New Account
                        </div>
                        {/*<h2></h2>*/}
                        <div className={classes.textField}>
                            <TextField className={classes.textField1} variant="outlined" id="emailAddress" label="E-mail Address" value={accountDetails.emailAddress}  onChange={handleChange} />
                        </div>
                        <div className={classes.textField}>
                            <TextField className={classes.textField1} variant="outlined" id="password" label="Password" value = {accountDetails.password} onChange={handleChange}
                                       InputProps={{endAdornment: (
                                               <Tooltip title="Auto-generate Password">
                                                   <InputAdornment>
                                                       <IconButton onClick={generatePassword}>
                                                           <CreateIcon/>
                                                       </IconButton>
                                                   </InputAdornment>
                                               </Tooltip>
                                           )}}/>
                        </div>
                        <div className={classes.textField}>
                            <TextField className={classes.textField1}  variant="outlined" id="firstName" label="First Name" value = {accountDetails.firstName} onChange={handleChange}/>
                            {/*<TextField className={classes.textField1}  variant="outlined" id="middleName" label="Middle Name" value = {accountDetails.middleName} onChange={handleChange}/>*/}
                            {/*<TextField className={classes.textField1}  variant="outlined" id="firstName" label="Last Name" value = {accountDetails.lastName} onChange={handleChange}/>*/}
                        </div>
                        <div className={classes.textField}>
                            <TextField  className={classes.textField1} variant="outlined" id="emailMessage" label="Message" multiline rows={6} value = {accountDetails.emailMessage} onChange={handleChange}
                                InputProps={{endAdornment: (
                                        <Tooltip title="Auto-generate Password">
                                            <Tooltip title="Add the above Message To The Templates" >
                                                {/*<Button className={classes.button} variant="contained" onClick={addToTemplates}>Add the above Message To The Templates</Button>*/}
                                                <IconButton  aria-label="add" onClick={templateDialogConfirmationOpen} >
                                                    <AddIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </Tooltip>
                                    )}}/><br/>
                            {/*<div className={classes.buttonDiv}>*/}


                            {/*</div>*/}
                            {/*<Button  variant="contained" onClick={() => setEmailDialogOpen(true)}>Choose Message</Button>*/}

                        </div>
                        {/*<div>*/}
                        {/*    <TextField className={classes.textField} variant="outlined" id="emailAddress" label="E-mail Address" value={accountDetails.emailAddress}  onChange={handleChange}/>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <div className={classes.buttonDiv}>*/}
                        {/*        <Tooltip title="Add the above Message To The Templates" arrow>*/}
                        {/*            /!*<Button className={classes.button} variant="contained" onClick={addToTemplates}>Add the above Message To The Templates</Button>*!/*/}
                        {/*            <Fab color="primary" aria-label="add" onClick={addToTemplates} >*/}
                        {/*                <AddIcon/>*/}
                        {/*            </Fab>*/}
                        {/*        </Tooltip>*/}

                        {/*    </div>*/}
                        {/*</div>*/}
                        <div>
                            <div className={classes.buttonDiv}>
                                <Button className={classes.button} variant="contained" onClick={() => setEmailDialogOpen(true)}>Choose Message</Button>
                            </div>
                        </div>

                        <div className={classes.buttonDiv}>
                            <Button className={classes.createButton} variant="contained" onClick={handleClickOpen}>Create Account</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Dialog
                scroll='paper'

                open={emailDialogOpen}
                onClose={handleEmailDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Choose A Message Template"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <List>
                            {
                                messageTemplates.map((value) => {
                                    return getTemplate(value);
                                })
                            }
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEmailDialogClose} color="primary">
                        Cancel
                    </Button>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </DialogActions>
            </Dialog>
            <Dialog

                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to create the account?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        On clicking "YES", new account for a reviewer with the filled in details will be created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createAccountButton} color="primary">
                        Yes
                    </Button>
                    <ToastContainer

                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </DialogActions>
            </Dialog>
            <Dialog

                open={templateDialogConfirmation}
                onClose={templateDialogConfirmationClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to add the message to your message templates?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={templateDialogConfirmationClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addToTemplates} color="primary">
                        Yes
                    </Button>
                    <ToastContainer

                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    New message template has been added!
                </Alert>
            </Snackbar>


        </div>
    )
}
export default CreateReviewerAccount;