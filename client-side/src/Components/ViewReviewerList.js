import React, {Component, useEffect, useState} from 'react';
// import {DataGrid, GridRowId} from '@material-ui/data-grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import Navbar from "./Navbar";
import {emailTemplates, reviewerDetailsColumns} from "./HardCode";
import EmailIcon from '@mui/icons-material/Email';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from "@material-ui/core/IconButton";
import {Tooltip} from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@material-ui/core/List";
import {ToastContainer} from "react-toastify";
import {otherEmailTemplates} from './HardCode';
import mailer from 'emailjs-com';
import{ init } from 'emailjs-com';

init("user_ic2EamjeWo1KypweBULA2");

const useStyles = makeStyles((theme) => {
    return ({
        main: {
            height: '100%',
            width:'100%',
            backgroundColor: 'white',
            backgroundSize: 'cover',
            position: 'absolute'
            // backgroundImage: `url(${background})`,
            // background: "no-repeat",
            // backgroundSize: "100% 100%",
            // backgroundPosition: 'center-fixed',



            // backgroundColor: '#3DADA9',
        },
        root: {
            // marginTop: '5%',
            height: '60%',
            width: '95%',
            paddingLeft:'5%',
            backgroundPosition: 'center-fixed'
        },
        root2: {
            '& .MuiAvatar-img': {
                width: '100%',
                height: '100%',
            },
            height: '70%',
            width: '70%'
        },
        dataGrid:{
            backgroundColor: 'white',
            borderRadius: 15,
            border: '1px solid rgba(0, 0, 0, 0.3)',
            boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, .6)',
            // borderColor: 'white'

        },
        heading:{
            color: '#032a73',
            // textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 40,
            marginTop: '5%'
            // fontFamily: 'Times New Roman'
        }

    });
});

function ViewReviewerList(props){
    const classes = useStyles()
    const [id, setId] = useState(1);
    const [profile, setProfile] = useState("");
    const [reviewerDetails, setReviewerDetails] = useState([]);
    const [user, setUser] = useState({id: -1, role: "", table: ""});
    const defaultColumns = JSON.parse(JSON.stringify(reviewerDetailsColumns));
    const [columns, setColumns] = useState(defaultColumns);
    const [open, setOpen] = useState(false);
    const [selectedReviewer, setSelectedReviewer] = useState(null);
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
    const [emailTemplate, setEmailtemplate] = useState({
        name: "",
        emailAddress: "",
        message: ""
    })
    const defaultTemplate = {
        name: "",
        emailAddress: "",
        message: ""
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEmailtemplate(defaultTemplate);
    };

    useEffect(()=>{

    }, [reviewerDetails]);
    useEffect(() => {
        setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        fetch(`http://localhost:3001/api/getReviewerDetails`).then((res) => res.json()).then((data) => {
            console.log(data);
            setReviewerDetails(data.result);
        });
    }, []);

    function handleClickGroup(params){
        console.log("helloman here i am")
        // props.history.push(`/reviewerForm`);
        props.history.push({
            pathname: `/admin/updateReviewerProfile/${params.getValue(params.id, "id")}`,
        })
    }
    function mailReviewer(params) {

        var email_address = params.getValue(params.id, "id");
        console.log("email : " + email_address);
        console.log(params)
        console.log(params.row.emailAddress);
        setSelectedReviewer(params.row);
        setEmailtemplate({...emailTemplate, name:params.row.firstName, emailAddress: params.row.emailAddress});
        setOpen(true);
    }
    function getFullName(firstName, middleName, lastName){
        var fullName = firstName;
        if(middleName == null || middleName == "null"){
            // console.log("NULL MIDDLE ");
            // console.log(typeof(middleName));
            if(lastName == null || lastName == "null"){
                return fullName;
            }
            else{
                fullName = fullName + " " + lastName;
                return fullName;
            }
        }
        else{
            fullName = fullName + " " + middleName;
            if(lastName == null || lastName == "null"){
                return fullName;
            }
            else{
                fullName = fullName + " " + lastName;
            }
            return fullName;
        }
    }



    useEffect(() => {
        setColumns(
            [
                ...columns,
                {
                    field: 'Update',
                    width: 260,
                    renderCell: (params) => (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            onClick={() => {
                                handleClickGroup(params);
                            }}
                        >
                            View and Update Profile
                        </Button>

                    ),
                },
                {
                    field: 'Mail',
                    width: 300,
                    renderCell: (params) => (
                        <Tooltip title="Mail">
                            <IconButton
                                style={{ marginLeft: 16 }}
                                onClick={() => {
                                    mailReviewer(params);
                                }}>
                                <EmailIcon/>
                            </IconButton>
                        </Tooltip>
                    ),
                },
            ]
        )
    }, [])




    const reviewerDetailsRows = [];
    for(var i = 0; i < reviewerDetails.length; i++){
        var fullName = getFullName(reviewerDetails[i].firstName, reviewerDetails[i].middleName, reviewerDetails[i].lastName)
        reviewerDetailsRows.push({id: reviewerDetails[i].id , fullName: fullName,  firstName: reviewerDetails[i].firstName, middleName: reviewerDetails[i].middleName, lastName: reviewerDetails[i].lastName,   emailAddress : reviewerDetails[i].emailAddress, phoneNumber: reviewerDetails[i].phoneNumber, primaryDepartment: reviewerDetails[i].primaryDepartment, designation: reviewerDetails[i].designation, gender: reviewerDetails[i].gender, researchAreas: reviewerDetails[i].researchAreas, domain: reviewerDetails[i].domain});
    }

    function handleChange(event) {
        event.persist();
        setEmailtemplate({...emailTemplate, [event.target.id]: event.target.value});
    }

    function handleEmailDialogClose() {
        setEmailDialogOpen(false);
    }

    function setMessageText(template) {
        setEmailtemplate({...emailTemplate, message:template.message});
        handleEmailDialogClose();
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

    function handleEmail(event) {
        setEmailDialogOpen(true);
    }


    function handleSend() {
        var templateParams = {
            to_email: emailTemplate.emailAddress,
            to_name: emailTemplate.name,
            message: emailTemplate.message,
            username: "will be removed",
            password: "will be removed"
        };
        mailer.send('service_pte39e7', 'template_wt0hnzx', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                // console.log("Reviewer account created successfully.");
                setEmailtemplate(defaultTemplate);
                handleClose()
                alert("Email Sent")
            }, function(error) {
                alert("Operation Failed.")
                console.log('FAILED...', error);
            });
    }

    return(
        <div className={classes.main}>
            <div className={classes.root}>
                <Navbar userrole={props.user.role} active="View Reviewers" match={props.match} user={props.user} history={props.history}/>
                <div className={classes.heading}>
                    Reviewers
                </div>

                <DataGrid
                    rows={reviewerDetailsRows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className={classes.dataGrid}
                    components={{
                        Toolbar: GridToolbar,
                    }}

                />
                {/*<div className={classes.heading}>*/}
                {/*    Previous Year's Reports*/}
                {/*</div>*/}

                {/*<DataGrid*/}
                {/*    //rows={}*/}
                {/*    columns={columns}*/}
                {/*    pageSize={4}*/}
                {/*    disableSelectionOnClick*/}
                {/*    className={classes.dataGrid}*/}
                {/*/>*/}

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Mail To : {selectedReviewer ? selectedReviewer.firstName : "None"} ({selectedReviewer ? selectedReviewer.emailAddress : "None"})
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="message"
                            label="Email Message"
                            type="text"
                            multiline
                            rows={3}
                            fullWidth
                            value={emailTemplate.message}
                            onChange = {handleChange}
                            variant="standard"
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={() => setEmailDialogOpen(true)}>Choose From Template</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSend}>Send</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={emailDialogOpen}
                    onClose={handleEmailDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Email Templates"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <List>
                                {
                                    otherEmailTemplates.map((value) => {
                                        return getTemplate(value);
                                    })
                                }
                            </List>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEmailDialogClose} color="primary">
                            Close
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

            </div>

        </div>

    )



}

export default ViewReviewerList;
