import React, {Component, useEffect, useState} from 'react';
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
import {facultyTableList, profileFields, reviewerFormFields, dofaFormFields, hodFormFields} from "./HardCode";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import Navbar from "./Navbar";
import {useLocation} from "react-router-dom";
import {Viewer, Worker} from "@react-pdf-viewer/core";
import {defaultLayoutPlugin} from "@react-pdf-viewer/default-layout";


const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: '5%',
        marginBottom: '5%'
    },
    subheading:{
        paddingLeft: '5%',
        paddingBottom: '2%'
    },
    textfields:{
        paddingLeft: '5%',
        paddingBottom: '5%'
    },
    button:{
        paddingLeft: '5%'
    },
    radioGroup:{
        // paddingLeft: '5%',

        marginLeft: '25%',
        paddingBottom: '5%'
    },
    box:{
        '& .MuiTextField-root': {
            m: 5,
            width: '55ch'
        },
        paddingBottom: '5%',
        marginLeft: '5%',
    }

}));
function HodForm(props) {
    // console.log(props.location.state.reportId);
    const location = useLocation();
    var fetchUrl = `http://localhost:3001/api/report/sendfile/${props.match.params.reportId}`;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const styles = {
        splitScreen: {
            display: 'flex',
            flexDirection: 'row',
        },
        topPane: {
            height: '100vh',
            width: '50%',
            backgroundColor: '#FFFFFF',
        },
        bottomPane: {
            height: '100vh',
            overflow: 'scroll',
            width: '50%',
            backgroundColor: '#FFFFFF',
        },
    }

    // const [reviewFormDetails, setReviewFormDetails] = useState(defaultReviewFormDetails);
    const classes = useStyles();
    const [user, setUser] = useState({id: -1, role: "", table: ""})
    const [open, setOpen] = React.useState(false);
    const [facultyDetails, setFacultyDetails] = useState({
        facultyName: "",
        emailAddress: "",
        yearOfReport: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [formValues, setFormValues] = useState({
        teaching: '3',
        instituteService: '3',
        professionalService: '3',
        hodRemark: '',
    });


    useEffect(() => {

    }, [facultyDetails])

    // useEffect(() => {
    //     const user = props.user;
    //     var table = ""
    //     if(facultyTableList.includes(user.role)) {
    //         table = "faculty"
    //     } else {
    //         table = "reviewer";
    //     }
    //     setUser({id: user.id, role: user.role, table: table});
    //
    //     // setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
    //     fetch(`http://localhost:3001/api/facultyDetails/${props.user.id}/${props.match.params.reportId}`).then((res) => res.json()).then((data) => {
    //         console.log("we are here!")
    //         console.log(data);
    //         setFacultyDetails(data.result[0]);
    //         // setReports(data.result);
    //
    //     });
    //     console.log("check faculty details here")
    //     console.log(facultyDetails)
    //
    //
    // }, []);




    function handleChange(event) {
        event.persist();
        // console.log(event);
        const copy = {...formValues};
        copy[event.target.name] = event.target.value;
        setFormValues(copy);
    }

    function getField(field) {
        const element = (
            <div>
                <div className="row gutters">
                    <div className={classes.subheading}>
                        <h5>{field.label}</h5>
                    </div>
                </div>
                <div className="row gutters">
                    <FormControl className={classes.radioGroup}>
                        <RadioGroup aria-label={field.label} name={field.name} value={field.value} onChange={handleChange} row>
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />

                        </RadioGroup>
                    </FormControl>

                </div>
            </div>
        );
        return element;
    }

    function confirmation(event){
        // setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        console.log("Submission confirmed");
        console.log(formValues);
        // Axios.post(`http://localhost:3001/api/updateReview/${user.id}/${props.match.params.reportId}`, formValues)
        //     .then(res => {
        //         props.history.push(`/assignedReports`);
        //     })


    }



    function renderFields(fieldsList) {
        const element = (
            <div>
                <Navbar active="Review Form" match={props.match} user={props.user} history={props.history}/>
                <div style={styles.splitScreen}>
                    <div style={styles.topPane}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                            <div
                                style={{
                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                    height: '100vh',
                                    width: '100%'
                                }}
                            >
                                <Viewer
                                    fileUrl={fetchUrl}
                                    plugins={[
                                        // Register plugins
                                        defaultLayoutPluginInstance
                                    ]}
                                />
                            </div>
                        </Worker>
                    </div>
                    <div style={styles.bottomPane}>
                        <div className={classes.root}>
                            <div className="container" >
                                <div>
                                    <div className="card-body">
                                        <div className="row gutters">
                                            <div className={classes.subheading}>
                                                <h2 className="mt-1 mb-3 text-primary">Faculty and Report Details</h2>
                                            </div>
                                        </div>
                                        <div className="row gutters">
                                            <div className={classes.textfields}>
                                                <TextField id="facultyName" label="Faculty Name" value={facultyDetails.facultyName}  InputProps={{readOnly: true,}}/>
                                            </div>
                                            <div className={classes.textfields}>
                                                <TextField id="emailAddress" label="Email Address" value={facultyDetails.emailAddress}  InputProps={{readOnly: true,}}/>
                                            </div>
                                            <div className={classes.textfields}>
                                                <TextField id="yearOfReport" label="Year Of Report" value={facultyDetails.yearOfReport}  InputProps={{readOnly: true,}}/>
                                            </div>
                                        </div>
                                        <div className="row gutters">
                                            <div className={classes.subheading}>
                                                <h2 className="text-primary">Review Form</h2>
                                            </div>

                                        </div>

                                        <div className="row gutters">
                                            <div className={classes.subheading}>
                                                <h5>( 1 - Below Average, 2 - Average, 3 - Good, 4 - Very Good, 5 - Excellent )</h5>
                                            </div>
                                        </div>

                                        {
                                            fieldsList.map((fieldValue) => {
                                                fieldValue.value = formValues[fieldValue.name]
                                                // console.log(fieldValue)
                                                // console.log(formValues)
                                                return getField(fieldValue);
                                            })
                                        }
                                        <div className="row gutters">
                                            <Box component="form" className={classes.box} noValidate autoComplete="off">
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    name="hodRemark"
                                                    label="Remarks and Feedback"
                                                    multiline
                                                    rows={6}
                                                    maxRows={6}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                />
                                            </Box>
                                        </div>

                                        <div className="row gutters">
                                            <div className={classes.button}>
                                                <Button variant="contained" onClick={handleClickOpen}>Submit Review</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Are you sure you want to submit your review?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        On clicking "Yes" your review on the faculty will be submitted, once submitted the form cannot be changed.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={confirmation} color="primary">
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

        );

        return element;
    }

    return (
        renderFields([...hodFormFields])
    );
}

export default HodForm;