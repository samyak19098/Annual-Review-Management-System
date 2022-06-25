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
import {facultyTableList, jsonUnescape, profileFields, reviewerFormFields, userUpdatableFields} from "./HardCode";
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
import Split from "react-split";
import '../style/splitPage.css'
import {jsonEscape} from "./HardCode";

const useStyles = makeStyles((theme) => ({

    root:{
        marginTop: '2%',
        marginBottom: '5%'
    },
    subheading:{
        marginLeft: 'auto',
        marginRight: 'auto',

        paddingBottom: '2%'
    },
    textfields:{
        width: 340,
        display: 'flex',
        alignItems: "center",
        // marginLeft: 'auto',
        // marginRight: 'auto',
    },
    details: {
        display: 'flex',
        alignItems: "center",
        backgroundColor: "black",
    },
    button:{
        paddingLeft: '5%',
        paddingBottom: '5%',
        // marginLeft:'5%'
        // margin: '5%'
    },
    radioGroup:{
        // paddingLeft: '5%',
        // marginLeft: 'auto',
        // margin: "auto",
        // marginRight: 'auto',
        // marginLeft: '25%',
        paddingBottom: '5%',
        display: 'flex',
        alignItems: "center",
        textAlign: "center"
    },
    box:{
        '& .MuiTextField-root': {
            m: 5,
            width: '55ch'
        },
        paddingBottom: '5%',
        // marginLeft: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }



}));

function ExternalReviewerForm(props) {

    // console.log(props.location.state.reportId);
    const location = useLocation();

    // const [reviewFormDetails, setReviewFormDetails] = useState(defaultReviewFormDetails);
    const classes = useStyles();
    var fetchUrl = `http://localhost:3001/api/report/sendfile/${props.match.params.reportId}`;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [user, setUser] = useState({id: -1, role: "", table: ""})
    const [open, setOpen] = React.useState(false);

    const [saveOpen, setSaveOpen] = React.useState(false);

    const [open1, setOpen1] = React.useState(false);
    const [facultyDetails, setFacultyDetails] = useState({
        facultyName: "",
        emailAddress: "",
        yearOfReport: ""
    })

    const [isDone, setIsDone] = useState(false);


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
    const handleClickSaveOpen = () => {
        setSaveOpen(true);
    };
    const handleSaveClose = () => {
        setSaveOpen(false);
    };



    const [formValues, setFormValues] = useState({
        publication: '3',
        publicationRemark: '',
        patents: '3',
        patentsRemark:'',
        funding: '3',
        fundingRemark: '',
        entrepreneurship: '3',
        entrepreneurshipRemark:'',
        finalReviewerRemark: '',
    });



    useEffect(() => {
        const user = props.user;
        var table = ""
        if (facultyTableList.includes(user.role)) {
            table = "faculty"
        } else {
            table = "reviewer";
        }
        setUser({id: user.id, role: user.role, table: table});
        let queryTable = "reviews";
        if(user.role == 'hod' || user.role == 'doaa') {
            queryTable = 'internalReviews';
        }
        // setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        fetch(`http://localhost:3001/api/facultyDetails/${queryTable}/${props.user.id}/${props.match.params.reportId}`).then((res) => res.json()).then((data) => {
            console.log("we are here!")
            console.log(data);
            if(data.status != 'EMPTY') {
                setFacultyDetails(data.result[0]);
            } else {
                // props.history.push('/unauthorized');
            }
            // setReports(data.result);

        });
        console.log("check faculty details here")
        console.log(facultyDetails)


    }, []);
    useEffect(() => {
        const user = props.user;
        var table = ""
        if (facultyTableList.includes(user.role)) {
            table = "faculty"
        } else {
            table = "reviewer";
        }
        setUser({id: user.id, role: user.role, table: table});
        let queryTable = "reviews";
        if(user.role == 'hod' || user.role == 'doaa') {
            queryTable = 'internalReviews';
        }
        // setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        fetch(`http://localhost:3001/api/formValues/${queryTable}/${props.user.id}/${props.match.params.reportId}`).then((res) => res.json()).then((data) => {
            console.log("getting the saved form data here !")
            // console.log(data.result)
            // console.log(data.result[0].reviewData);
            const formDataObj = JSON.parse(data.result[0].reviewData)
            console.log(formDataObj)
            console.log(formDataObj)
            if(data.status != 'EMPTY') {
                setFormValues({...formValues, ...formDataObj});
                var isDone_toSet = false;
                if(data.result[0]['reviewStatus'] == 'reviewed'){
                    isDone_toSet = true;
                }
                setIsDone(isDone_toSet);
            } else {
                // props.history.push('/unauthorized');
            }
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
                <div className="row gutters">
                    <FormControl className={classes.radioGroup}>
                        <div>
                            <RadioGroup aria-label={field.label} name={field.name} value={field.value}
                                        onChange={handleChange} row>
                                <FormControlLabel disabled={isDone ? true : false} value="1" control={<Radio/>} label="1"/>
                                <FormControlLabel disabled={isDone ? true : false} value="2" control={<Radio/>} label="2"/>
                                <FormControlLabel disabled={isDone ? true : false} value="3" control={<Radio/>} label="3"/>
                                <FormControlLabel disabled={isDone ? true : false} value="4" control={<Radio/>} label="4"/>
                                <FormControlLabel disabled={isDone ? true : false} value="5" control={<Radio/>} label="5"/>
                            </RadioGroup>
                        </div>

                    </FormControl>

                </div>
                <div className='row gutters'>
                    <Box component="form" className={classes.box} noValidate autoComplete="off">
                        <TextField
                            disabled={(isDone ? true: false)}
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
        // setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        console.log("Submission confirmed");
        console.log(formValues)

        const toSubmit = {...formValues}
        console.log('Newline sample before:');
        console.log(toSubmit);
        Object.keys(toSubmit).map((key) => {
            // Replace all occurrences of \n with \\n
            toSubmit[key] = jsonEscape(toSubmit[key]);
        });
        console.log('Newline sample after:');
        console.log(toSubmit);

        let queryTable = 'reviews';
        if(user.role == 'hod' || user.role == 'doaa') {
            queryTable = 'internalReviews';
        }
        console.log("Sahi hai yar")
        Axios.post(`http://localhost:3001/api/updateReview/${queryTable}/${user.id}/${props.match.params.reportId}`, toSubmit)
            .then(res => {
                console.log("Before doing some stuff")
                console.log(res)
                if(res.status == 'ERR') {
                    console.log("Error in reviews query");
                }
                console.log("Trying to run this query");
                // Axios.post(`http://localhost:3001/api/updateModifiedReview/${queryTable}/${user.id}/${props.match.params.reportId}`, formValues)
                //     .then(res => {
                //         if(res.status == 'ERR') {
                //             console.log("Error in modified reviews query");
                //         }
                //         console.log("Modified result is");
                //         console.log(res);
                //     })
            })
        props.history.push("/assignedReports/")
    }

    function saveForm(event) {
        // setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        console.log("Saving confirmed");
        console.log(formValues)

        const toSubmit = {...formValues}
        console.log('Newline sample before:');
        console.log(toSubmit);
        Object.keys(toSubmit).map((key) => {
             // Replace all occurrences of \n with \\n
            toSubmit[key] = jsonEscape(toSubmit[key]);
        });
        console.log('Newline sample after:');
        console.log(toSubmit);

        let queryTable = 'reviews';
        if(user.role == 'hod' || user.role == 'doaa') {
            queryTable = 'internalReviews';
        }
        Axios.post(`http://localhost:3001/api/updateReview/saveForm/${queryTable}/${user.id}/${props.match.params.reportId}`, toSubmit)
            .then(res => {
                // console.log("here man yo!")
                // props.history.push("/assignedReports/");
            })
        props.history.push("/assignedReports/")
    }



    function renderFields(fieldsList) {
        if(fieldsList.length == 0) {
            return <Unauthorized/>
        }
        const element = (
            <div>
                <Navbar userrole={props.user.role} active="Review Form" match={props.match} user={props.user} history={props.history}/>
                {/*<div style={styles.splitScreen}>*/}
                {/*<div style={{overflow:'hidden'}}>*/}
                <Split
                    sizes={[50, 50]}
                    minSize={[550, 670]}
                    direction="horizontal"
                    cursor="col-resize"
                    className="split-flex"
                    style={{display: "flex", flexDirection: "row"}}
                    // minSize={}
                >
                    <div style={styles.topPane}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                            <div
                                style={{
                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                    height: '100vh',
                                    overflow: 'hidden',
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
                            <div className="container">
                                <div >
                                    <div className="card-body">
                                        <div className="row gutters">
                                            <div className={classes.subheading}>
                                                <h2 className="mt-1 mb-3 text-primary">Faculty and Report Details</h2>
                                            </div>
                                        </div>
                                        <div className="row gutters" style={{
                                            display: 'flex',
                                            alignItems: "center",
                                            // border: '2px solid red',
                                            // justifyContent: "center"
                                        }}>
                                            <div className={classes.textfields}>
                                                <TextField disabled={true} spellCheck={true} id="facultyName" label="Faculty Name" value={facultyDetails.facultyName}
                                                           InputProps={{readOnly: true,}}/>
                                            </div>
                                            <div className={classes.textfields}>
                                                <TextField disabled={true} id="emailAddress" label="Email Address"
                                                           value={facultyDetails.emailAddress} InputProps={{readOnly: true,}}/>
                                            </div>
                                            <div className={classes.textfields}>
                                                <TextField disabled={true} id="yearOfReport" label="Year Of Report"
                                                           value={facultyDetails.yearOfReport} InputProps={{readOnly: true,}}/>
                                            </div>
                                        </div>
                                        <div className="row gutters">
                                            <div className={classes.subheading}>
                                                <h2 className="text-primary">Review Form</h2>
                                            </div>

                                        </div>
                                        <div className="row gutters">
                                            <div className={classes.subheading}>
                                                <h4>Research Development and Innovation</h4>
                                            </div>
                                        </div>
                                        <div className="row gutters">
                                            <div className={classes.subheading}>
                                                <h5>( 1 - Below Average, 2 - Average, 3 - Good, 4 - Very Good, 5 - Excellent )</h5>
                                            </div>
                                        </div>

                                        {
                                            fieldsList.map((fieldValue) => {
                                                fieldValue.value = formValues[fieldValue.name];
                                                fieldValue.remarkField = jsonUnescape(formValues[fieldValue.name+"Remark"]);
                                                // console.log(fieldValue)
                                                // console.log(formValues)
                                                return getField(fieldValue);
                                            })
                                        }
                                        <div className="row gutters">
                                            <div className={classes.subheading}>
                                                <h5>Final Feedback</h5>
                                            </div>
                                        </div>
                                        <div classname='row gutters'>
                                            <Box component="form" className={classes.box} noValidate autoComplete="off">
                                                <TextField
                                                    disabled={(isDone ? true: false)}
                                                    id="outlined-multiline-static"
                                                    spellCheck={true}
                                                    name="finalReviewerRemark"
                                                    label="Remarks and Feedback"
                                                    value={jsonUnescape(formValues.finalReviewerRemark)}
                                                    multiline
                                                    rows={6}
                                                    maxRows={6}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                />
                                            </Box>
                                        </div>


                                        <div className="row gutters">
                                            {isDone ? <div></div> :
                                                <div className={classes.button}>
                                                    <Button variant="contained" style={{marginRight: "5%"}} onClick={handleClickOpen}>Submit
                                                        Review</Button>

                                                    {/*<div className={classes.button}>*/}
                                                    <Button variant="contained" onClick={handleClickSaveOpen}>Save
                                                        Review</Button>
                                                </div>
                                            }
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
                                        On clicking "YES" your review on the report will be submitted, once submitted the form
                                        cannot be changed.
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
                            <Dialog
                                open={saveOpen}
                                onClose={handleSaveClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Are you sure you want to save your review?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        On clicking "YES" your review on the report will be saved.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleSaveClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={saveForm} color="primary">
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </Split>
                {/*</div>*/}
            </div>

        );

        return element;
    }

    return (
        renderFields([...reviewerFormFields])
    );
}

export default ExternalReviewerForm;