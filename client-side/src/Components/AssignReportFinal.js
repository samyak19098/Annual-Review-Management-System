import React, {Component, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Navbar from "./Navbar";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from '@mui/material/Avatar';
import Typography from "@material-ui/core/Typography";
import {ButtonGroup} from "@material-ui/core";
import Axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Viewer, Worker} from "@react-pdf-viewer/core";
import ReviewerListCumReview from "./ReviewerListCumReview";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {ToastContainer} from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

const getCurrentYear = () => {
    return new Date().getFullYear();
}

const styles = {
    splitScreen: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '50px',
        marginRight: '50px',
        marginTop: '10px',
        borderRadius: '30px',
        // border: '2px solid red'
    },
    leftPane: {
        width: '60%',
        margin: '20px',
        maxHeight: '80vh',
        // border: '2px solid green',
        boxShadow: '10px 10px 5px grey',
        borderRadius: '2%'

        // backgroundColor: 'yellow',
    },
    rightPane: {
        width: '40%',
        margin: '20px',
        minHeight: '40vh',
        // border: '2px solid cyan',
        // boxShadow: '10px 10px 5px grey',
        borderRadius: '2%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh',
        // backgroundColor: 'cyan',
    },
    topRightPane: {
        height: '45%',
        width: '100%',
        boxShadow: '10px 10px 5px grey',
        overflow: 'scroll',
        maxHeight: '45%',
        borderRadius: '2%',

    },
    middleRightPane: {
        height: '10%',
        width: '100%',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        // boxShadow: '10px 10px 5px grey',
        maxHeight: '10%',
        borderRadius: '2%',

    },
    bottomRightPane: {
        height: '45%',
        width: '100%',
        boxShadow: '10px 10px 5px grey',
        overflow: 'scroll',
        maxHeight: '45%',
        borderRadius: '2%',

    }

    // reportListContainer: {
    //     // height: '100%',
    //     overflowY: 'scroll',
    //     overflowX: 'hidden',
    //     padding: '10',
    //     margin: '5%'
    // },
    // rootContainer:{
    //     display: 'flex',
    //     height: '100%',
    //     flexDirection: 'column',
    //     // backgroundColor: 'blue'
    // },
    // header: {
    //     height: '10vh',
    //     display:'flex',
    //     justifyContent:'space-between',
    //     margin:'4%',
    //     padding:'4%',
    //     // backgroundColor: 'yellow'
    // },
    // bodyContent: {
    //     display:'flex',
    //     justifyContent: 'center',
    //     height: '70vh',
    //     width: '80%',
    //     margin: '4%',
    //     padding: '4%',
    //     // backgroundColor:'red'
    // }

}

function AssignReportFinal(props){

    const [checked, setChecked] = useState([]);
    const [allReviewer, setAllReviewer] = useState([]);
    const [allReport, setAllReport] = useState([]); //left
    const [assignedReport, setAssignedReport] = useState([]); //right
    const [unassignedReport, setUnassignedReport] = useState([]);//left-partial
    const [selectedReviewer, setSelectedReviewer] = useState([]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    // const [allReport, setAllReport] = useState([]);
    // const [allReviewer, setAllReviewer] = useState([]); //left
    // const [assignedReviewer, setAssignedReviewer] = useState([]); //right
    // const [unassignedReviewer,setUnassignedReviewer] = useState([])
    // const [selectedReport, setSelectedReport] = useState();
    const [loading, setLoading] = useState(false);
    var checkedUnassigned = intersection(unassignedReport, checked);
    var checkedAssigned = intersection(assignedReport, checked);

    useEffect(()=>{

        fetch(`http://localhost:3001/api/getReports/${getCurrentYear()}`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "EMPTY") {
                    return;
                }
                console.log("IN ASSIGN REPORT getReport!");
                console.log(data.result);
                setAllReport(data.result);
            });

        fetch("http://localhost:3001/api/getReviewers/all", {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "EMPTY") {
                    return;
                }
                data.result.map((value, index) => {
                    Object.keys(data.result[index]).forEach((key) => {
                        if(data.result[index][key] == null){
                            data.result[index][key] = "";
                        }
                    })
                })
                setAllReviewer(data.result);
                console.log('all reviewer set ');
            });

    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    //assign(add reviewer)
    const handleCheckedRight = () => {
        checkedUnassigned = intersection(unassignedReport, checked);
        if(checkedUnassigned.length !== 0){
            Axios.post('http://localhost:3001/api/assignReport/add', {
                reports: checkedUnassigned,
                reviewer: selectedReviewer
            })
                .then(res => {
                    if (res.data == "Added") {
                        console.log("Reviewers Added");
                        setAssignedReport(assignedReport.concat(checkedUnassigned));
                        setUnassignedReport(not(unassignedReport, checkedUnassigned));
                        setChecked(not(checked, checkedUnassigned));
                    } else {
                        console.log("Error! Reviewer not assigned");
                    }
                });
        }
        handleClose()
    };

    //unassign(delete reviewer)
    const handleCheckedLeft = () => {

        checkedAssigned = intersection(assignedReport, checked);
        if(checkedAssigned.length !== 0){
            Axios.post('http://localhost:3001/api/assignReport/remove', {
                reports: checkedAssigned,
                reviewer: selectedReviewer
            })
                .then(res => {
                    if (res.data == "Deleted") {
                        console.log("Reviewers Deleted");
                        setUnassignedReport(unassignedReport.concat(checkedAssigned));
                        setAssignedReport(not(assignedReport, checkedAssigned));
                        setChecked(not(checked, checkedAssigned));
                    } else {
                        console.log("Error! Reviewer not deleted");
                    }
                });
        }
        handleClose1()
        // setUnassignedReviewer(unassignedReviewer.concat(checkedAssigned));
        // setAssignedReviewer(not(assignedReviewer, checkedAssigned));
        // setChecked(not(checked, checkedAssigned));
    };

    function getFullName(firstName, middleName, lastName){
        if(middleName === 'null'){
            console.log(`Full name = ${firstName + middleName + lastName}`);
            if(lastName === 'null'){
                return firstName;
            }
            else{
                firstName = firstName + " " + lastName;
                return firstName;
            }
        }
        else{
            firstName = firstName + " " + middleName;
            if(lastName === 'null'){
                return firstName;
            }
            else{
                firstName = firstName + " " + lastName;
            }
            return firstName;
        }
    }

    function removeFromArray(original, remove)  {
        let updatedArray = [...original];
        // console.log("Before")
        // console.log(original)
        // console.log("Removing")
        // console.log(remove);
        for(let i = 0 ; i < remove.length; i++){
            updatedArray = updatedArray.filter(value => value.id !== remove[i].id);
        }
        // console.log("After")
        // console.log(updatedArray)
        return updatedArray;
    }

    function removeNonDomain(original, domain) {
        let updatedArray = [...original];
        // // for(let i = 0 ; i < original.length; i++){
        console.log("BEFORE DOMAINING");
        console.log(updatedArray);
        updatedArray = updatedArray.filter(value => value.primaryDepartment === domain);
        console.log("FINAL : ");
        console.log(updatedArray);
        return updatedArray;
        // // }
    }

    function getAssignedReports(reviewer) {
        setSelectedReviewer((reviewer));
        console.log("Selected ");
        console.log(reviewer);
        fetch(`http://localhost:3001/api/getAssignedReports/${reviewer.id}`, {
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
                setAssignedReport(data.result);
                console.log("Reports:");
                console.log(allReport);
                var updatedReports = removeFromArray(allReport, data.result);
                updatedReports = removeNonDomain(updatedReports, reviewer.domain);
                setUnassignedReport(updatedReports);
            });
    }

    function checkReviewer(field){
        return JSON.stringify(field) === JSON.stringify(selectedReviewer);
    }

    function getReviewer(field) {
        const fullName = getFullName(field.firstName, field.middleName, field.lastName);
        const displayString = field.id.toString() + " : " + fullName;
        const organization = field.organization;
        const reviewerDomain = field.domain;
        // const dateString = field.submissionDate.split("T")[0];

        const element = (
            <React.Fragment key={field.id}>
                <ListItem button key={field.id} onClick={() => (getAssignedReports(field))} style={{
                    backgroundColor:(checkReviewer(field) ? "#8eb6f8": "white")
                }}>
                    <ListItemAvatar>
                        <Avatar>
                            <AssignmentIndIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={displayString  }
                        secondary={`${organization}, Domain : ${reviewerDomain}`}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        );
        return element;
    }

    const customList = (header, title, items) => (
        // <div>
        <Card sx={{height:'100%'}}>
            <Typography style={{
                textAlign: 'center',
                fontSize: '2vw',
                fontWeight: 'bold',
            }}>{header}</Typography>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: '100%',
                    height: '80%',
                    bgcolor: 'background.paper',
                    overflow: 'scroll',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                            style={{
                                marginBottom: '6px',
                            }}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={ value.id + ": " + `${getFullName(value.firstName, value.middleName, value.lastName)}`} secondary={value.submissionDate}/>
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    return(

        <div>
            <Navbar userrole={props.user.role} active="Assign Reports" match={props.match} user={props.user} history={props.history}/>

            <div style={styles.splitScreen}>
                <div style={styles.leftPane}>
                    <Typography style={{
                        textAlign: 'center',
                        fontSize: '2vw',
                        fontWeight: 'bold',
                        height: '10%',
                    }}>
                        Available Reviewers (AY {getCurrentYear()})
                    </Typography>
                    {/*<div style = {styles.reportListContainer}>*/}
                    <List style={{
                        overflow: 'scroll',
                        maxHeight: '90%'
                    }}>
                        {
                            allReviewer.map((value) => {
                                return getReviewer(value);
                            })
                        }
                    </List>
                    {/*</div>*/}
                </div>
                <div style={styles.rightPane}>
                    <div className='assigned-reviewer' style={styles.topRightPane}>
                        {/*<div><Typography style={{display:'inline', textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}>Available Reviewers</Typography></div>*/}
                        {customList('Unassigned Reports', 'Unassigned', unassignedReport)}
                    </div>
                    <div className='button-grp' align='center' style={styles.middleRightPane}>
                        <ButtonGroup>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleClickOpen}
                                disabled={checkedUnassigned.length === 0}
                                aria-label="move selected dwon"
                            >
                                <ArrowDownwardIcon/>
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleClickOpen1}
                                disabled={checkedAssigned.length === 0}
                                aria-label="move selected up"
                            >
                                <ArrowUpwardIcon/>
                            </Button>
                        </ButtonGroup>

                    </div>
                    <div className='unassigned-reviewer' style={styles.bottomRightPane}>
                        {/*<div><Typography style={{display:'inline', textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}>Assigned Reviewers</Typography></div>*/}
                        {customList('Assigned Reports', 'Assigned', assignedReport)}
                    </div>
                </div>
            </div>
            <Dialog

                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to assign the selected reports to the chosen reviewer?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        On clicking "YES", the selected reports will be assigned to the chosen reviewer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCheckedRight} color="primary">
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

                open={open1}
                onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to unassign the selected reports from the chosen reviewer?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        On clicking "YES", the selected reports will be unassigned from the chosen reviewer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose1} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCheckedLeft} color="primary">
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
        </div>
        // <div className="page-container" style={{backgroundColor:'cyan'}}>
        //     <Navbar active="Assign Report" match={props.match} user={props.user} history={props.history}/>
        //     <div className="root-container" style={styles.rootContainer}>
        //         <div className="assign-content" style={styles.splitScreen}>
        //             <div className="report-list" style={styles.topPane}>
        //                 <Card>
        //                     <Typography style={{textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}>Submitted Reports (AY {getCurrentYear()})</Typography>
        //                     <div style = {styles.reportListContainer}>
        //                         {/*<div style={{textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}>Submitted Reports</div>*/}
        //                         <List>
        //                             {
        //                                 allReport.map((value) => {
        //                                     return getReport(value);
        //                                 })
        //                             }
        //                         </List>
        //                     </div>
        //                 </Card>
        //             </div>
        //             <div className="transfer-list" style={styles.bottomPane}>
        //
        //             </div>
        //
        //             {/*<div>*/}
        //
        //
        //             {/*    <Grid container spacing={8} justifyContent="space-around" alignItems="center">*/}
        //             {/*        <Grid item xs={6}>*/}
        //             {/*            <Grid container alignItems="center">*/}
        //             {/*                <Grid item>*/}
        //             {/*                    <Card>*/}
        //             {/*                        <Typography>Submitted Reports (AY {getCurrentYear()})</Typography>*/}
        //             {/*                        <div style = {styles.reportListContainer}>*/}
        //             {/*                            <List>*/}
        //             {/*                                {*/}
        //             {/*                                    allReport.map((value) => {*/}
        //             {/*                                        return getReport(value);*/}
        //             {/*                                    })*/}
        //             {/*                                }*/}
        //             {/*                            </List>*/}
        //             {/*                        </div>*/}
        //             {/*                    </Card>*/}
        //             {/*                </Grid>*/}
        //             {/*            </Grid>*/}
        //             {/*            /!*</div>*!/*/}
        //             {/*        </Grid>*/}
        //
        //             {/*        <Grid item xs={6}>*/}
        //             {/*            <Grid container spacing={2} justifyContent="center" alignItems="center">*/}
        //             {/*                <Grid item>{customList('Choices', unassignedReviewer)}</Grid>*/}
        //             {/*                <Grid item>*/}
        //             {/*                    <Grid container direction="column" alignItems="center">*/}
        //             {/*                        <Button*/}
        //             {/*                            sx={{ my: 0.5 }}*/}
        //             {/*                            variant="outlined"*/}
        //             {/*                            size="small"*/}
        //             {/*                            onClick={handleCheckedRight}*/}
        //             {/*                            disabled={checkedUnassigned.length === 0}*/}
        //             {/*                            aria-label="move selected right"*/}
        //             {/*                        >*/}
        //             {/*                            &gt;*/}
        //             {/*                        </Button>*/}
        //             {/*                        <Button*/}
        //             {/*                            sx={{ my: 0.5 }}*/}
        //             {/*                            variant="outlined"*/}
        //             {/*                            size="small"*/}
        //             {/*                            onClick={handleCheckedLeft}*/}
        //             {/*                            disabled={checkedAssigned.length === 0}*/}
        //             {/*                            aria-label="move selected left"*/}
        //             {/*                        >*/}
        //             {/*                            &lt;*/}
        //             {/*                        </Button>*/}
        //             {/*                    </Grid>*/}
        //             {/*                </Grid>*/}
        //             {/*                <Grid item>{customList('Chosen', assignedReviewer)}</Grid>*/}
        //             {/*            </Grid>*/}
        //             {/*        </Grid>*/}
        //             {/*    </Grid>*/}
        //             {/*</div>*/}
        //
        //         </div>
        //     </div>
        // </div>
    )

}

export default AssignReportFinal;