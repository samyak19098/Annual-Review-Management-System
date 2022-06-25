import React, {Component, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import '@fontsource/roboto'
import {makeStyles, TextField} from "@material-ui/core";
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {ToastContainer} from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',

        // backgroundColor: 'white',
        backgroundSize: "cover",
        position: 'absolute',
        // backgroundImage: `url(${background})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundColor:
        //     theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        // backgroundSize: "100% 100%",
        // backgroundPosition: 'center-fixed',
        // paddingBottom: '10%'

    },
    updateAccount : {
        alignItems: 'center',
        marginTop: '5%',
        width: '80%',
        height: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        // position: "absolute",
        // paddingLeft: '20%',
        // backgroundPosition: 'center',
        // paddingTop: '10%',
        backgroundColor: 'white',
        borderRadius: 15,
        border: '1px solid rgba(0, 0, 0, 0.3)',
        boxShadow: '2px 5px 5px 2px rgba(0, 0, 0, .6)',
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    heading: {
        // color: 'white',
        paddingTop: '5%',
        paddingBottom: '5%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        // fontFamily: 'Times New Roman'
    },
    textfields:{
        width: 340,
        paddingLeft: '5%',
        paddingBottom: '5%'
    },
    select:{
        minWidth: 340,
        paddingLeft: '5%',
        paddingBottom: '5%'
    },
    textField1 :{
        width : '85%'
        // padding: '5%',
    },
    buttonDiv: {

        // paddingTop: '5%',
        // paddingLeft: '35%',
        marginBottom: '5%',
        marginLeft: "auto",
        marginRight: "auto",
    },

    button: {
        marginBottom: '5%',
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: '#3D2C8D',
        color: 'white',
        width: '15%'

    },
    date: {
        paddingTop: '10%'
    }


}));
function UpdateReviewerProfile(props){
    const classes = useStyles()
    const [user, setUser] = useState({id: -1, role: "", table: ""});
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState('Active');
    const [leaveColumns, setLeaveColumns] = React.useState();
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    const [reviewerDetails, setReviewerDetails] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        emailAddress: "",
        gender: "",
        phoneNumber : "",
        primaryDepartment: "",
        researchAreas: "",
        designation: "",
        organization: "",
        reviewerStatus: "",
        leaveStartDate: new Date().toISOString().slice(0, 10),
        leaveEndDate: new Date().toISOString().slice(0, 10),
        natureOfLeave: "",
        domain:""
    })
    useEffect(()=>{

    }, [reviewerDetails]);
    useEffect(() => {
        setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        fetch(`http://localhost:3001/api/getReviewerDetails/${props.match.params.reviewerId}`).then((res) => res.json()).then((data) => {
            console.log(data);
            setReviewerDetails(data.result[0]);
            // reviewerDetails.leaveStartDate = new Date(reviewerDetails.leaveStartDate).toISOString().slice(0, 10)
            // reviewerDetails.leaveEndDate = new Date(reviewerDetails.leaveEndDate).toISOString().slice(0, 10)
        });
    }, []);

    const handleChange = (event) => {
        event.persist();
        console.log(event); // If there is no change happening, this won't be logged
        setReviewerDetails({...reviewerDetails, [event.target.id]: event.target.value});
    }
    const handleStatusChange = (event) => {

        reviewerDetails.reviewerStatus = event.target.value
        setStatus(event.target.value)
        if(event.target.value != 'Active'){
            setLeaveColumns(false);
        }
        else{
            setLeaveColumns(true);
            setReviewerDetails({...reviewerDetails, leaveStartDate: null, leaveEndDate: null});
            // reviewerDetails.leaveStartDate = null;
            // reviewerDetails.leaveEndDate = null;
        }

    }
    const handleStartDate = (newValue) => {
        reviewerDetails.leaveStartDate = new Date(newValue).toISOString().slice(0, 10);
        setStartDate(newValue);
    };
    const handleEndDate = (newValue) => {
        reviewerDetails.leaveEndDate = new Date(newValue).toISOString().slice(0, 10);
        setEndDate(newValue);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    console.log(reviewerDetails);

    function confirmation(event) {
        // setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        console.log("Update confirmed");
        console.log(reviewerDetails)
        Axios.post(`http://localhost:3001/api/updatedReviewerDetails/${props.match.params.reviewerId}`, reviewerDetails)
            .then(res => {
                // console.log("here man yo!")
                // props.history.push("/assignedReports/");
            })
        props.history.push("/viewReviewerAccounts/")
    }


    return(
        <div className={classes.root}>
            {/*<div>*/}
                <Navbar userrole={props.user.role} active="Update Reviewer Account" match={props.match} user={props.user} history={props.history}/>
                {/*<div className={classes.updateAccount}>*/}
                    <div className="row gutters">
                        <div className={classes.heading}>
                            Update Reviewer Account
                        </div>
                    </div>
                    <div className="row gutters">

                        <div className={classes.textfields}>
                            <TextField id="firstName" label="First Name" value={reviewerDetails.firstName}
                                       onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="middleName" label="Middle Name" value={reviewerDetails.middleName}
                                       onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="lastName" label="Last Name" value={reviewerDetails.lastName}
                                       onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="gender" label="Gender" value={reviewerDetails.gender}
                                       onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="emailAddress" label="Email Address"
                                       value={reviewerDetails.emailAddress} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="phoneNumber" label="Phone Number"
                                       value={reviewerDetails.phoneNumber} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="organization" label="Organization"
                                       value={reviewerDetails.organization} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="primaryDepartment" label="Primary Department"
                                       value={reviewerDetails.primaryDepartment} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="researchAreas" label="Research Areas"
                                       value={reviewerDetails.researchAreas} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="designation" label="Designation"
                                       value={reviewerDetails.designation} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="domain" label="Domain"
                                       value={reviewerDetails.domain} onChange={handleChange}/>
                        </div>
                        <div className={classes.select}>
                            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="reviewerStatus"
                                value={reviewerDetails.reviewerStatus}
                                label="Status"
                                onChange={handleStatusChange}
                            >
                                <MenuItem value='Active'>Active</MenuItem>
                                <MenuItem value='Inactive'>Inactive</MenuItem>
                                <MenuItem value='On Leave'>On Leave</MenuItem>
                                <MenuItem value='On Sabbatical'>On Sabbatical</MenuItem>
                            </Select>
                        </div>
                        <div className="row gutters">
                            <div className={classes.textfields}>
                                <TextField disabled={leaveColumns} id="natureOfLeave" label="Remarks" value={reviewerDetails.natureOfLeave} multiline maxRows={5} rows={5}
                                           onChange={handleChange}/>
                            </div>
                            <div className={classes.textfields}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <div>
                                        <DesktopDatePicker
                                            id="leaveStartDate"
                                            className={classes.date}
                                            disabled={leaveColumns}
                                            label="Starting Date"
                                            inputFormat="dd/MM/yyyy"
                                            value={reviewerDetails.leaveStartDate}
                                            onChange={handleStartDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </div>
                                    <div>
                                        <DesktopDatePicker
                                            id="leaveEndDate"
                                            className={classes.date}
                                            disabled={leaveColumns}
                                            label="Ending Date"
                                            inputFormat="dd/MM/yyyy"
                                            value={reviewerDetails.leaveEndDate}
                                            onChange={handleEndDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </div>


                                </LocalizationProvider>

                            </div>

                        </div>
                    </div>
                    <div className="row gutters">
                        {/*<div className={classes.buttonDiv}>*/}
                            <Button className={classes.button} variant="contained" onClick={handleClickOpen}>Update Account</Button>
                        {/*</div>*/}
                    </div>
                {/*</div>*/}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to update the account?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        On clicking "YES", The reviewer account will be updated with the new filled in values.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmation} color="primary">
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
            {/*</div>*/}
        </div>
    )

}

export default UpdateReviewerProfile;