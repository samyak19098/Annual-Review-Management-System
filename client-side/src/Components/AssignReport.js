import React, {Component, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import '@fontsource/roboto'
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ReviewerListCumReview from "./ReviewerListCumReview";
import {MenuItem, TextField} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import MyCheckBox from "../Custom-Components/MyCheckBox";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));
const getCurrentYear = () => {
    return new Date().getFullYear();
}
const styles = {
    splitScreen: {
        display: 'flex',
        flexDirection: 'row',
    },
    leftPane: {
        width: '50%',
        height: '80vh',
        backgroundColor: 'yellow',
        overflow: 'scroll',
    },
    rightPane: {
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        width: '50%',
        backgroundColor: 'cyan',
    },
    rightPaneTop: {
        backgroundColor: 'white',
        margin: 'auto',
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '50%',
        width: '100%',
        overflow: 'scroll',
    },

    rightPaneBottom: {
        backgroundColor: '#FFFFFF',
        margin: 'auto',
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '50%',
        width: '100%',
        overflow: 'scroll',
    }

}
function AssignReport(props){

    // const classes = useStyles();
    const [reportList, setReportList] = useState([]);
    const [allReviewers, setAllReviewers] = useState([]);
    const [allReviewerMap, setAllReviewerMap] = useState({});
    const [unassignedReviewers, setUnassignedReviewers] = useState([]);
    const [assignedReviewers, setAssignedReviewers] = useState([]);

    const [selectedReport, setSelectedReport] = useState(null);
    const [checkedUpdating, setCheckedUpdating] = useState({});
    const [checkedAssigned, setCheckedAssigned] = useState({});
    // props.user : user.status, user.id, user.role

    useEffect(() => {

        fetch(`http://localhost:3001/api/getReports/${getCurrentYear()}`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "EMPTY") {
                    return;
                }
                // console.log("IN ASSIGN REPORT getReport!");
                console.log(data.result);
                setReportList(data.result);
            });


        fetch("http://localhost:3001/api/getReviewers/all", {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "EMPTY") {
                    return;
                }
                data.result.map((value, index) => {
                    Object.keys(data.result[index]).forEach((key) => {
                        if(data.result[index][key] == null){
                            data.result[index][key] = "";
                        }
                    })
                })
                setAllReviewers(data.result);

                const initMap = {};
                data.result.map((value, index) => {
                    initMap[value.id] = value;
                })
                setAllReviewerMap(initMap);
                // for(let i = 0 ; i < allReviewers.length; i++){
                //     initMap[data.result[i].id]
                // }
                const initUpdating = {};
                data.result.map((value, index) => {
                    initUpdating[value.id] = false;
                });
                const initAssigned = {...initUpdating};
                setCheckedUpdating(initUpdating);
                setCheckedAssigned(initAssigned);
            });

    }, []);


    function changeUpdatingStatus(id){
        console.log("CLICKING !!");
        const copyCheckedUpdating = {...checkedUpdating};
        copyCheckedUpdating[id] = (!copyCheckedUpdating[id]);
        setCheckedUpdating(copyCheckedUpdating);
    }

    function removeFromArray(original, remove)  {
        let updatedArray = [...original];
        for(let i = 0 ; i < remove.length; i++){
            updatedArray = updatedArray.filter(value => JSON.stringify(value) !== JSON.stringify(remove[i]));
        }
        return updatedArray;
    }
    function getAssignedReviewers(report) {
        setSelectedReport(report);
        fetch(`http://localhost:3001/api/getReviewers/${report.id}`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                data.result.map((value, index) => {
                    Object.keys(data.result[index]).forEach((key) => {
                        if(data.result[index][key] == null){
                            data.result[index][key] = "";
                        }
                    })
                })
                setAssignedReviewers(data.result);
                const initUpdating = {...checkedUpdating};
                const initAssigned = {...checkedAssigned};
                var allReviewerList = [...allReviewers];
                allReviewerList.map((value, index) => {
                    initUpdating[value.id] = false;
                    initAssigned[value.id] = false;
                });
                data.result.map((value, index) => {
                    initAssigned[value.id] = true;
                })
                console.log(initAssigned);
                console.log(initUpdating);
                setCheckedUpdating(initUpdating);
                setCheckedAssigned(initAssigned);

                var  updatedReviewers = removeFromArray(allReviewerList, data.result);
                setUnassignedReviewers(updatedReviewers);
            });
    }
    function getFullName(firstName, middleName, lastName){
        var fullName = firstName;
        if(middleName == ""){
            if(lastName == ""){
                return fullName;
            }
            else{
                fullName = fullName + " " + lastName;
                return fullName;
            }
        }
        else{
            fullName = fullName + " " + middleName;
            if(lastName == ""){
                return fullName;
            }
            else{
                fullName = fullName + " " + lastName;
            }
            return fullName;
        }
    }

    function removeReviewer(reviewer, report) {
        Axios.post("http://localhost:3001/api/assignReviewer/remove", {reviewer: reviewer, report: report})
            .then(res => {
                if(res.data == "Removed"){
                    var updatedReportReviewers = [...assignedReviewers];
                    var updatedReportReviewers = updatedReportReviewers.filter((rev) => rev !== reviewer);
                    var updatedAllReviewers = [...unassignedReviewers, reviewer];
                    setAssignedReviewers(updatedReportReviewers);
                    setUnassignedReviewers(updatedAllReviewers);
                }
                else{
                    console.log("Error! Reviewer not assigned");
                }
            })
    }

    function getReportReviewer(field) {
        // console.log(field.id + " : " + field.firstName + " | " + field.middleName + " | " + field.lastName);
        var fullName = getFullName(field.firstName, field.middleName, field.lastName);
        const element = (
            <MyCheckBox isUpdating={checkedUpdating[field.id]} isAssigned={checkedAssigned[field.id]}  fieldId={field.id} clickHandler={changeUpdatingStatus} reviewerName={fullName} inactiveColor={'cyan'} activeColor={'red'}/>
        );
        return element;
    }

    function addReviewersToReport(reviewers, report) {

        Axios.post("http://localhost:3001/api/assignReviewer/add", {reviewers: reviewers, report: report})
            .then(res => {
                if(res.data == "Added"){
                    console.log("Reviewers Added");
                    // var updatedReportReviewers = [...assignedReviewers, reviewer];
                    // var updatedAllReviewers = [...unassignedReviewers];
                    // updatedAllReviewers = updatedAllReviewers.filter((rev) => rev !== reviewer);
                    // setReportReviewers(updatedReportReviewers);
                    // setReviewerList(updatedAllReviewers);
                }
                else{
                    console.log("Error! Reviewer not assigned");
                }
            })
    }

    function addReviewer(reviewer, report) {
        var updatedReportReviewers = [...assignedReviewers, reviewer];
        var updatedAllReviewers = [...unassignedReviewers];
        updatedAllReviewers = updatedAllReviewers.filter((rev) => rev !== reviewer);
        setAssignedReviewers(updatedReportReviewers);
        setUnassignedReviewers(updatedAllReviewers);
    }

    function getAllReviewer(field) {
        var fullName = getFullName(field.firstName, field.middleName, field.lastName);
        const element = (
            <MyCheckBox isUpdating={checkedUpdating[field.id]} isAssigned={checkedAssigned[field.id]} fieldId={field.id} clickHandler={changeUpdatingStatus} reviewerName={fullName} inactiveColor={'cyan'} activeColor={'green'}/>
        );
        return element;
    }
    function getReport(field, index) {
        var fullName = getFullName(field.firstName, field.middleName, field.lastName);
        var displayString = field.id.toString() + " : " + fullName + ": " + field.fileName + " (" + field.submissionDate.split("T")[0] + ")";
        const element = (

            <ListItem button key={field.id} onClick={() => getAssignedReviewers(field)}>
                <ListItemIcon><AssignmentIndIcon/></ListItemIcon>
                <ListItemText primary={displayString}/>
            </ListItem>

        );
        return element;
    }


    function updateAssignment() {

        const copyCheckedUpdating = {...checkedUpdating};
        Object.keys(checkedUpdating).map((value, index) => {
            copyCheckedUpdating[value] = false;
        })
        setCheckedUpdating(copyCheckedUpdating);

        const insertReviewersIdx = Object.keys(checkedUpdating).filter((t) => checkedUpdating[t] === true && checkedAssigned[t] === false);
        const deleteReviewersIdx = Object.keys(checkedUpdating).filter((t) => checkedUpdating[t] === true && checkedAssigned[t] === true);
        const copyCheckedAssigned = {...checkedAssigned};

        insertReviewersIdx.map((value) => {
            copyCheckedAssigned[value] = true;
        })
        deleteReviewersIdx.map((value) => {
            copyCheckedAssigned[value] = false;
        })
        setCheckedAssigned(copyCheckedAssigned);


        const insertReviewers = insertReviewersIdx.map((value, index) => {
            return allReviewerMap[parseInt(value)];
        });
        const deleteReviewers = deleteReviewersIdx.map((value, index) => {
            return allReviewerMap[parseInt(value)];
        });

        if(insertReviewers.length !== 0) {
            // console.log(insertReviewers);
            // console.log(insertReviewersIdx);
            // console.log(deleteReviewers);
            // console.log(selectedReport);
            Axios.post("http://localhost:3001/api/assignReviewer/add", {
                reviewers: insertReviewers,
                report: selectedReport
            })
                .then(res => {
                    if (res.data == "Added") {
                        console.log("Reviewers Added");
                        var updatedAssignedReviewers = [...assignedReviewers, ...insertReviewers];
                        console.log("UPDATED ASSIGNED ");
                        console.log(updatedAssignedReviewers);
                        var updatedUnassignedReviewers = [...unassignedReviewers];
                        updatedUnassignedReviewers = removeFromArray(updatedUnassignedReviewers, insertReviewers);
                        setAssignedReviewers(updatedAssignedReviewers);
                        setUnassignedReviewers(updatedUnassignedReviewers);
                    } else {
                        console.log("Error! Reviewer not assigned");
                    }
                });
        }

        if(deleteReviewers.length !== 0){

            Axios.post("http://localhost:3001/api/assignReviewer/remove", {
                reviewers: deleteReviewers,
                report: selectedReport
            })
                .then(res => {
                    if (res.data == "Deleted") {
                        console.log("Reviewers Deleted");

                        var updatedAssignedReviewers = [...assignedReviewers];
                        updatedAssignedReviewers = removeFromArray(updatedAssignedReviewers, deleteReviewers);
                        var updatedUnassignedReviewers = [...unassignedReviewers, ...deleteReviewers];
                        setAssignedReviewers(updatedAssignedReviewers);
                        setUnassignedReviewers(updatedUnassignedReviewers);
                        // var updatedAssignedReviewers = [...assignedReviewers, ...insertReviewers];
                        // console.log("UPDATED ASSIGNED ");
                        // console.log(updatedAssignedReviewers);
                        // var updatedUnassignedReviewers = [...unassignedReviewers];
                        // updatedUnassignedReviewers = removeFromArray(updatedUnassignedReviewers, insertReviewers);
                        // // updatedAllReviewers = updatedAllReviewers.filter((rev) => rev !== reviewer);
                        // setAssignedReviewers(updatedAssignedReviewers);
                        // setUnassignedReviewers(updatedUnassignedReviewers);
                    } else {
                        console.log("Error! Reviewer not assigned");
                    }
                });


        }


    }

    return(
        <div>
            <Navbar userrole={props.user.role} active="Assign Report" match={props.match} user={props.user} history={props.history}/>
            <div style={styles.splitScreen}>
                <div style={styles.leftPane}>
                    <div>
                        <List>
                            {
                                reportList.map((value) => {
                                    return getReport(value);
                                })
                            }
                        </List>
                    </div>
                </div>
                <div style={styles.rightPane}>
                    <div style={styles.rightPaneTop}
                        // style={{
                        //     border: '1px solid rgba(0, 0, 0, 0.3)',
                        //     height: '100vh',
                        //     width: '100%'
                        // }}
                    >
                        <List>
                            {
                                assignedReviewers.map((value) => {
                                    return getReportReviewer(value);
                                })
                            }
                        </List>
                    </div>
                    <div style={styles.rightPaneBottom}>
                        <List>
                            {
                                unassignedReviewers.map((value) => {
                                    return getAllReviewer(value);
                                })
                            }
                        </List>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={() => updateAssignment()}>
                            Update Reviewers
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default AssignReport;