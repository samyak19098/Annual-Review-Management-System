import React, {useEffect, useState} from 'react'
import Navbar from "./Navbar";
import {useLocation} from "react-router-dom";
import {defaultLayoutPlugin} from "@react-pdf-viewer/default-layout";
import {facultyTableList, reviewerFormFields, gradingFormFields, jsonEscape, jsonUnescape} from "./HardCode";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Axios from "axios";
import Unauthorized from "./Unauthorized";
import {Viewer, Worker} from "@react-pdf-viewer/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

    root:{
        marginTop: '2%',
        marginBottom: '5%',
        marginLeft: "auto",
        marginRight:'auto'
    },
    subheading:{
        paddingBottom: '2%',
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center"
    },
    textfields:{
        width: 340,
        paddingBottom: '5%',
        marginLeft: "auto",
        marginRight: "auto"
    },
    button:{
        // paddingLeft: '5%',
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: 'center'
    },
    radioGroup:{
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
        alignSelf: 'center',
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: 'center'
    }


}));


/*
Returns the grading form component which contains
the final grading form for the DOFA
 */

function GradingForm(props) {
    const location = useLocation();
    const classes = useStyles();
    var fetchUrl = `http://localhost:3001/api/report/sendfile/${props.match.params.reportId}`;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [user, setUser] = useState({id: -1, role: "", table: ""})
    const [open, setOpen] = React.useState(false);
    const [openSave, setOpenSave] = React.useState(false);
    const [isFinalized, setIsFinalized] = React.useState("false");

    const [facultyDetails, setFacultyDetails] = useState({
        facultyId: "",
        firstName: "",
        middleName: "",
        lastName: "",
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
        },
        bottomPane: {
            height: '100vh',
            overflowY: 'scroll',
            overflowX: 'hidden',
            width: '50%',
        },
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickSaveOpen = () => {
        setOpenSave(true);
    };
    const handleSaveClose = () => {
        setOpenSave(false);
    };



    const [formValues, setFormValues] = useState({
        research: '3',
        teaching: '3',
        services: '3',
        remark: '',
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

        // Fetch the faculty details of the faculty member
        fetch(`http://localhost:3001/api/facultyDetails/gradingForm/${props.match.params.reportId}`).then((res) => res.json()).then((data) => {
            if(data.status != 'EMPTY') {
                setFacultyDetails(data.result[0]);
                formValues.yearOfReport = data.result[0].yearOfReport
                formValues.facultyId = data.result[0].facultyId

            } else {
                // props.history.push('/unauthorized');
            }
        });
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

        if(facultyDetails.facultyId != ''){

            // Fetch saved grading data
            fetch(`http://localhost:3001/api/facultyGrade/save/${facultyDetails.facultyId}/${facultyDetails.yearOfReport}`).then((res) => res.json()).then((data) => {
                console.log("getting the saved form data here !")
                console.log(data.result == null)
                console.log(data);
                console.log(data);
                if(data.result.length != 0) {
                    const formDataObj = JSON.parse(data.result[0].grade)
                    if (data.status != 'EMPTY') {
                        setFormValues({...formValues, ...formDataObj})
                        setIsFinalized(data.result[0].finalStatus);
                    } else {
                        // props.history.push('/unauthorized');
                    }
                }
            });
        }
    }, [facultyDetails]);


    function handleChange(event) {
        event.persist();
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
                        <div>
                            <RadioGroup aria-label={field.label} name={field.name} value={field.value}
                                        onChange={handleChange} row>
                                <FormControlLabel disabled={(isFinalized === "true") ? true : false} value="1" control={<Radio/>} label="1"/>
                                <FormControlLabel disabled={(isFinalized === "true") ? true : false} value="2" control={<Radio/>} label="2"/>
                                <FormControlLabel disabled={(isFinalized === "true") ? true : false} value="3" control={<Radio/>} label="3"/>
                                <FormControlLabel disabled={(isFinalized === "true") ? true : false} value="4" control={<Radio/>} label="4"/>
                                <FormControlLabel disabled={(isFinalized === "true") ? true : false} value="5" control={<Radio/>} label="5"/>
                            </RadioGroup>
                        </div>
                    </FormControl>

                </div>
            </div>
        );
        return element;
    }

    function confirmation(event) {
        const toSubmit = {...formValues}
        Object.keys(toSubmit).map((key) => {
            // Replace all occurrences of \n with \\n
            toSubmit[key] = jsonEscape(toSubmit[key]);
        });


        handleClose()
        let queryTable = 'reviews';
        if(user.role == 'hod' || user.role == 'doaa') {
            queryTable = 'internalReviews';
        }
        Axios.post(`http://localhost:3001/api/facultyGrade/${facultyDetails.facultyId}/`, toSubmit)
            .then(res => {
                console.log("Testing post request")
            })
        props.history.push("/reviewedReports/")

    }

    function save(event) {
        handleSaveClose()
        const toSubmit = {...formValues}
        Object.keys(toSubmit).map((key) => {
            // Replace all occurrences of \n with \\n
            toSubmit[key] = jsonEscape(toSubmit[key]);
        });

        let queryTable = 'reviews';
        if(user.role == 'hod' || user.role == 'doaa') {
            queryTable = 'internalReviews';
        }
        Axios.post(`http://localhost:3001/api/facultyGrade/save/${facultyDetails.facultyId}/`, toSubmit)
            .then(res => {
                console.log("Testing post request")
            })
        props.history.push("/reviewedReports/")

    }

    function getFullName(firstName, middleName, lastName) {
        var fullName = firstName;
        if (middleName == "") {
            if (lastName == "") {
                return fullName;
            } else {
                fullName = fullName + " " + lastName;
                return fullName;
            }
        } else {
            fullName = fullName + " " + middleName;
            if (lastName == "") {
                return fullName;
            } else {
                fullName = fullName + " " + lastName;
            }
            return fullName;
        }
    }
    function renderFields(fieldsList) {
        if(fieldsList.length == 0) {
            return <Unauthorized/>
        }
        const element = (
            <div>
                <Navbar userrole={props.user.role} active="Review Form" match={props.match} user={props.user} history={props.history}/>
                    <div>
                        <div className={classes.root}>
                            <div >
                                <div >
                                    <div className="card-body">
                                        <div className="row gutters">
                                            <div className={classes.subheading}>
                                                <h2 className="mt-1 mb-3 text-primary">Faculty and Report Details</h2>
                                            </div>
                                        </div>
                                        <div className="row gutters">
                                            <div className={classes.textfields}>
                                                <TextField disabled={true} id="facultyName" label="Faculty Name" value={getFullName(facultyDetails.firstName,  facultyDetails.middleName, facultyDetails.lastName,)}
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
                                                <h2 className="text-primary">Grading Form</h2>
                                            </div>

                                        </div>
                                        <div className="row gutters">
                                            <div className={classes.subheading}>
                                                {/*<h4>Research Development and Innovation</h4>*/}
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
                                                return getField(fieldValue);
                                            })
                                        }
                                        <div classname='row gutters'>
                                            <Box component="form" className={classes.box} noValidate autoComplete="off">
                                                <TextField
                                                    disabled={((isFinalized === "true") ? true : false)}
                                                    id="outlined-multiline-static"
                                                    name="remark"
                                                    label="Remarks and Feedback"
                                                    multiline
                                                    rows={6}
                                                    maxRows={6}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    value={jsonUnescape(formValues.remark)}
                                                />
                                            </Box>
                                        </div>


                                        <div className="row gutters">
                                            {(isFinalized === "true") ? <div></div> :
                                                <div className={classes.button}>
                                                    <Button variant="contained" style={{marginRight: "5%"}} onClick={handleClickOpen}>
                                                        Submit Review
                                                    </Button>
                                                    <Button variant="contained" onClick={handleClickSaveOpen}>
                                                        Save Review
                                                    </Button>
                                                </div>}

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
                                open={openSave}
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
                                    <Button onClick={save} color="primary">
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
            </div>

        );

        return element;
    }

    return (
        renderFields([...gradingFormFields])
    );
}

export default GradingForm;