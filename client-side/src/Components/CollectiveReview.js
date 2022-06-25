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
import {
    facultyTableList,
    profileFields,
    reviewerFormFields,
    userUpdatableFields,
    collectiveReviewFields,
    jsonEscape, jsonUnescape
} from "./HardCode";
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
import Unauthorized from "./Unauthorized";


const useStyles = makeStyles((theme) => ({

    root:{
        marginTop: '2%',
        marginBottom: '5%'
    },
    subheading:{
        paddingLeft: '5%',
        paddingBottom: '2%'
    },
    textfields:{
        width: 340,
        paddingLeft: '5%',
        paddingBottom: '5%'
    },
    button:{
        paddingLeft: '5%',
        // marginLeft:'5%'
        // margin: '5%'
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
        marginLeft: '3%',
    }


}));

function ReviewDisplay(props) {

    // console.log(props.location.state.reportId);
    const location = useLocation();

    // const [reviewFormDetails, setReviewFormDetails] = useState(defaultReviewFormDetails);
    const classes = useStyles();
    // var fetchUrl = `http://localhost:3001/api/report/sendfile/${props.match.params.reportId}`;
    // const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [user, setUser] = useState({id: -1, role: "", table: ""})
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [facultyDetails, setFacultyDetails] = useState({
        facultyName: "",
        emailAddress: "",
        yearOfReport: ""
    })


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
            overflowY: 'scroll',
            overflowX: 'hidden',
            width: '50%',
            backgroundColor: '#FFFFFF',
        },
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [finalStatus, setFinalStatus] = useState("False");


    const [formValues, setFormValues] = useState({
        fundingRemark:"",
        patentsRemark:"",
        publicationRemark:"",
        entrepreneurshipRemark:"",
        finalReviewerRemark:"",
        servicesRemark:"",
        teachingRemark:"",
        finalInternalRemark:""
    });

    useEffect(() => {

        fetch(`http://localhost:3001/api/collectiveReview/${props.reportId}`).then((res) => res.json()).then((data) => {
            console.log("getting the saved form data here !")
            // console.log(data.result[0].reviewData);
            let formDataObj = {};
            try{
                formDataObj = JSON.parse(data.result[0].reviewData)
            }
            catch (err){
                formDataObj = props.formData['formed']
                console.log("ERROR")
            }
            setFormValues(formDataObj);
            // console.log(formDataObj)
            // if(data.status != 'EMPTY') {
            //     setFormValues(formDataObj);
            // } else {
            //     // props.history.push('/unauthorized');
            // }
            // setReports(data.result);

        });
        console.log("check form details here")
        console.log(formValues)


    }, []);


    function handleChange(event) {
        event.persist();
        // console.log(event);
        const copy = {...formValues};
        copy[event.target.name] = event.target.value;
        setFormValues(copy);
        console.log((formValues))
    }

    function getField(field) {
        const element = (
            <div>
                <div className="row gutters">
                    <div className={classes.subheading}>
                        <h5>{field.label}</h5>
                    </div>
                </div>
                {/*<div className="row gutters">*/}
                {/*    <FormControl className={classes.radioGroup}>*/}
                {/*        <div>*/}
                {/*            <RadioGroup aria-label={field.label} name={field.name} value={field.value}*/}
                {/*                        onChange={handleChange} row>*/}
                {/*                <FormControlLabel value="1" control={<Radio/>} label="1"/>*/}
                {/*                <FormControlLabel value="2" control={<Radio/>} label="2"/>*/}
                {/*                <FormControlLabel value="3" control={<Radio/>} label="3"/>*/}
                {/*                <FormControlLabel value="4" control={<Radio/>} label="4"/>*/}
                {/*                <FormControlLabel value="5" control={<Radio/>} label="5"/>*/}
                {/*            </RadioGroup>*/}
                {/*        </div>*/}

                {/*    </FormControl>*/}
                {/*</div>*/}
                <div className='row gutters'>
                    <Box component="form" className={classes.box} noValidate autoComplete="off">
                        <TextField
                            disabled={props.saveVisible ? false : true}
                            id="outlined-multiline-static"
                            spellCheck={true}
                            name={field.name+"Remark"}
                            label={field.label+ " Remarks and Feedback"}
                            value={field.remarkField}
                            multiline
                            rows={6}
                            maxRows={6}
                            onChange={handleChange}
                            variant="outlined"
                            // style={{height: 200}}
                        />
                    </Box>
                </div>
            </div>
        );
        return element;
    }

    function confirmation(event) {
        console.log("Submission confirmed");
        console.log(formValues)

        Object.keys(formValues).map((key) => {
            // Replace all occurrences of \n with \\n
            formValues[key] = jsonEscape(formValues[key]);
        });

        Axios.post(`http://localhost:3001/api/finalizeCollectiveReview/${props.reportId}`, formValues)
            .then(res => {
                console.log("Before doing some stuff")
                console.log(res)
                if(res.status == 'ERR') {
                    console.log("Error in reviews query");
                }
                console.log("Trying to run this query");
                setOpen(false);
                // Axios.post(`http://localhost:3001/api/updateModifiedReview/${queryTable}/${user.id}/${props.match.params.reportId}`, formValues)
                //     .then(res => {
                //         if(res.status == 'ERR') {
                //             console.log("Error in modified reviews query");
                //         }
                //         console.log("Modified result is");
                //         console.log(res);
                //     })
            })
        // props.history.push("/assignedReports/")
        // props.history.push("/report/view/grade/" + props.reportId);
    }
    function saveForm(event) {
        // setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        console.log("Saving confirmed");
        console.log(formValues)
        let queryTable = props.queryTable;

        Object.keys(formValues).map((key) => {
            // Replace all occurrences of \n with \\n
            formValues[key] = jsonEscape(formValues[key]);
        });

        // if(user.role == 'hod' || user.role == 'doaa') {
        //     queryTable = 'internalReviews';
        // }
        Axios.post(`http://localhost:3001/api/saveCollectiveReview/${props.reportId}`, formValues)
            .then(res => {
                // console.log("here man yo!")
                // props.history.push("/assignedReports/");
            })
        // props.history.push("/assignedReports/")

        // report/view/grade/1
    }



    function renderFields(fieldsList) {
        if(fieldsList.length == 0) {
            return <Unauthorized/>
        }
        const element = (
            <div>
                <div className={classes.root}>
                    <div className="container">
                        <div >
                            <div className="card-body">
                                {/*<div className="row gutters">*/}
                                {/*    <div className={classes.subheading}>*/}
                                {/*        <h2 className="mt-1 mb-3 text-primary">Faculty and Report Details</h2>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="row gutters">*/}
                                {/*    <div className={classes.textfields}>*/}
                                {/*        <TextField disabled={true} spellCheck={true} id="facultyName" label="Faculty Name" value={facultyDetails.facultyName}*/}
                                {/*                   InputProps={{readOnly: true,}}/>*/}
                                {/*    </div>*/}
                                {/*    <div className={classes.textfields}>*/}
                                {/*        <TextField disabled={true} id="emailAddress" label="Email Address"*/}
                                {/*                   value={facultyDetails.emailAddress} InputProps={{readOnly: true,}}/>*/}
                                {/*    </div>*/}
                                {/*    <div className={classes.textfields}>*/}
                                {/*        <TextField disabled={true} id="yearOfReport" label="Year Of Report"*/}
                                {/*                   value={facultyDetails.yearOfReport} InputProps={{readOnly: true,}}/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="row gutters">
                                    <div className={classes.subheading}>
                                        <h2 className="text-primary">Review Form</h2>
                                    </div>
                                </div>



                                {
                                    fieldsList.map((fieldValue) => {
                                        fieldValue.value = jsonUnescape(formValues[fieldValue.name]);
                                        fieldValue.remarkField = jsonUnescape(formValues[fieldValue.name+"Remark"]);
                                        return getField(fieldValue);
                                    })
                                }

                                <div className="row gutters">
                                    {props.saveVisible ? <Button variant="contained" onClick={saveForm}>Save Review</Button> : <div></div>}
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
                                On clicking "YES" the review will be finalized.
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

        );

        return element;
    }

    return (
        renderFields([...collectiveReviewFields])
    );
}

export default ReviewDisplay;