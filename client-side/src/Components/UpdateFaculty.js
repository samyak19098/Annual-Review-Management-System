import React, {Fragment, Component, useEffect, useState} from 'react';
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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
// import MomentUtils from "@date-io/moment";
// import DateFnsUtils from '@date-io/date-fns';
// import moment from "moment";
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import {LocalizationContext} from "@react-pdf-viewer/core";

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
function UpdateFaculty(props){
    const classes = useStyles()
    const [user, setUser] = useState({id: -1, role: "", table: ""});
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [leaveColumns, setLeaveColumns] = React.useState();
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    const [facultyDetails, setFacultyDetails] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        emailAddress: "",
        gender: "",
        doj: "",
        phoneNumber : "",
        primaryDepartment: "",
        secondaryDepartment: "",
        role: "",
        empId: "",
        phd: "",
        researchAreas: "",
        designation: "",
        facultyStatus: "",
        leaveStartDate: new Date().toISOString().slice(0, 10),
        leaveEndDate: new Date().toISOString().slice(0, 10),
        natureOfLeave: ""

    })
    useEffect(()=>{

    }, [facultyDetails]);
    useEffect(() => {
        setUser({id: props.user.id, role: props.user.role, table: props.user.table})
        fetch(`http://localhost:3001/api/getfacultyDetails/${props.match.params.facultyId}`).then((res) => res.json()).then((data) => {
            console.log(data);
            setFacultyDetails(data.result[0]);
        });
    }, []);

    function handleChange(event) {
        event.persist();
        //console.log(event); // If there is no change happening, this won't be logged
        setFacultyDetails({...facultyDetails, [event.target.id]: event.target.value});
    }

    const handleStatusChange = (event) => {

        facultyDetails.facultyStatus = event.target.value
        setStatus(event.target.value)
        if(event.target.value != 'Active'){
            setLeaveColumns(false);
        }
        else{
            setLeaveColumns(true);
            setFacultyDetails({...facultyDetails, leaveStartDate: null, leaveEndDate: null})
        }
    }
    const handleStartDate = (newValue) => {
        facultyDetails.leaveStartDate = new Date(newValue).toISOString().slice(0, 10);
        setStartDate(newValue);
    };
    const handleEndDate = (newValue) => {
        facultyDetails.leaveEndDate = new Date(newValue).toISOString().slice(0, 10);
        setEndDate(newValue);
    };
    console.log(facultyDetails);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    function confirmation(event) {
        // setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        console.log("Update confirmed");
        console.log(facultyDetails)
        Axios.post(`http://localhost:3001/api/updatedfacultyDetails/${props.match.params.facultyId}`, facultyDetails)
            .then(res => {
                // console.log("here man yo!")
                // props.history.push("/assignedReports/");
            })
        props.history.push("/viewFacultyAccounts/")
    }


    return(
        <div className={classes.root}>
            {/*<div>*/}
            {/*<div>*/}
                <Navbar userrole={props.user.role} active="Update Faculty Account" match={props.match} user={props.user} history={props.history}/>
                {/*<div className={classes.updateAccount}>*/}
                    <div className="row gutters">
                        <div className={classes.heading}>
                            Update Faculty Account
                        </div>
                    </div>
                    <div className="row gutters">

                        <div className={classes.textfields}>
                            <TextField id="firstName" label="First Name" value={facultyDetails.firstName}
                                       onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="middleName" label="Middle Name" value={facultyDetails.middleName}
                                       onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="lastName" label="Last Name" value={facultyDetails.lastName}
                                       onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="gender" label="Gender" value={facultyDetails.gender}
                                       onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="doj" label="Date of Joining" value={facultyDetails.doj}
                                       onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="emailAddress" label="Email Address"
                                       value={facultyDetails.emailAddress} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="phoneNumber" label="Phone Number"
                                       value={facultyDetails.phoneNumber} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="primaryDepartment" label="Primary Department"
                                       value={facultyDetails.primaryDepartment} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="secondaryDepartment" label="Secondary Department"
                                       value={facultyDetails.secondaryDepartment} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="designation" label="Designation"
                                       value={facultyDetails.designation} onChange={handleChange}/>
                        </div>
                        <div className={classes.textfields}>
                            <TextField id="role" label="Role"
                                       value={facultyDetails.role} onChange={handleChange}/>
                        </div>
                        <div className="row gutters">
                            <div className={classes.textfields}>
                                <TextField id="researchAreas" label="Research Areas" multiline maxRows={5} rows={5}
                                           value={facultyDetails.researchAreas} onChange={handleChange}/>
                            </div>
                            <div className={classes.textfields}>
                                <TextField id="phd" label="PHD" multiline maxRows={5} rows={5}
                                           value={facultyDetails.phd} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className={classes.select}>
                            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="reviewerStatus"
                                value={facultyDetails.facultyStatus}
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
                                <TextField disabled={leaveColumns} id="natureOfLeave" value={facultyDetails.natureOfLeave} label="Remarks" multiline maxRows={5} rows={5}
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
                                            value={facultyDetails.leaveStartDate}
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
                                            value={facultyDetails.leaveEndDate}
                                            onChange={handleEndDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </div>


                                </LocalizationProvider>

                            </div>

                        </div>

                        {/*<div className={classes.textfields}>*/}
                        {/*    <TextField id="empId" label="Emp Id"*/}
                        {/*               value={facultyDetails.empId} onChange={handleChange}/>*/}
                        {/*</div>*/}
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
                            On clicking "YES", The faculty account will be updated with the new filled in values.
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

export default UpdateFaculty;