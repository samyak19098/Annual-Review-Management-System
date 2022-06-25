import React, {useEffect, useState} from 'react'
import Navbar from "./Navbar";
import {useLocation} from "react-router-dom";
import {defaultLayoutPlugin} from "@react-pdf-viewer/default-layout";
import {facultyTableList, reviewerFormFields, gradingFormFields} from "./HardCode";
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
import {collectiveReviewFields} from "./HardCode";
import CollectiveReview from "./CollectiveReview";

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
        marginLeft: '3%',
    }


}));

function FacultyCollectiveReview(props) {
    // console.log(props.location.state.reportId);
    const location = useLocation();

    // const [reviewFormDetails, setReviewFormDetails] = useState(defaultReviewFormDetails);
    const classes = useStyles();
    // var fetchUrl = `http://localhost:3001/api/report/sendfile/${props.match.params.reportId}`;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [user, setUser] = useState({id: -1, role: "", table: ""})
    const [currentReportId, setCurrentReportId] = useState(-1);
    const [open, setOpen] = React.useState(false);
    const [facultyDetails, setFacultyDetails] = useState({
        facultyId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        emailAddress: "",
        yearOfReport: ""
    });

    const [remarks, setRemarks] = useState({"fetched": {}, "formed": {"fundingRemark":"", "patentsRemark":"", "publicationRemark":"", "entrepreneurshipRemark":"", "finalReviewerRemark":"", "servicesRemark":"", "teachingRemark":"", "finalInternalRemark":""}});

    useEffect(() => {
        fetch(`http://localhost:3001/api/faculty/setReportId/${props.user.id}`).then((res) => res.json()).then((data) => {
            console.log(data['result'][0])
            if(data['result'][0] != undefined){
                console.log("is not undefined")
                var reportId = data['result'][0]['reportId'];
                setCurrentReportId(reportId);
                console.log("Current report Id");
                console.log(reportId);
                console.log("Setted");
                console.log(currentReportId)
            }

            // setReports(data.result);

        });
    }, []);

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
                {/*<div style={styles.splitScreen}>*/}
                {/*{console.log("FETCHED + ")}*/}
                <CollectiveReview key = {currentReportId} formData = {remarks} reportId={currentReportId} saveVisible = {false}></CollectiveReview>
                {/*</div>*/}
            </div>

        );

        return element;
    }

    return (
        renderFields([...gradingFormFields])
    );
}

export default FacultyCollectiveReview;