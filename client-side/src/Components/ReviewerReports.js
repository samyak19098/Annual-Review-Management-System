import React, {Component, useEffect, useState} from 'react';
// import {DataGrid, GridRowId} from '@material-ui/data-grid';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
import {reviewerReportsColumns} from "./HardCode";
import background from "../images/new1.jpg";
const useStyles = makeStyles((theme) => {
    return ({
        main: {
            height: '200%',
            width: '100%',
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
            height: '70%',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        root2: {
            '& .MuiAvatar-img': {
                width: '100%',
                height: '100%',
            },
            height: '50%',
            width: '70%'
        },
        dataGrid:{
            backgroundColor: 'white',
            borderRadius: 15,
            border: '1px solid rgba(0, 0, 0, 0.3)',
            height: '50%',
            width:'85%',
            marginTop: '2%',
            boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, .3)',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
            overflow: "auto",
            // color: "#4848ff",
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

function ReviewerReports(props){
    const classes = useStyles();
    const [id, setId] = useState(1);
    const [profile, setProfile] = useState("");
    const [reports, setReports] = useState([]);
    const [user, setUser] = useState({id: -1, role: "", table: ""});
    const defaultColumns = JSON.parse(JSON.stringify(reviewerReportsColumns));
    const [columns, setColumns] = useState(defaultColumns);

    useEffect(()=>{

    }, [reports]);
    useEffect(() => {
        let reviewTable = 'reviews';
        if(props.user.role != 'reviewer') {
            reviewTable = 'internalReviews';
        }
        console.log(`My role is ${props.user.role}`);
        setUser({id: props.user.id, role: props.user.role, table: reviewTable})
        fetch(`http://localhost:3001/api/reviewer/assignedReports/${reviewTable}/${props.user.id}`).then((res) => res.json()).then((data) => {
            console.log(data);
            setReports(data.result);
        });
    }, []);

    console.log("here here ")
    console.log(reports.length);
    console.log(reports);
    // console.log(reports[0].reportId);
    function handleClickGroup(params){
        console.log("helloman here i am")
        // props.history.push(`/reviewerForm`);

        // console.log(params.reviewStatus)
        props.history.push({
            pathname: `/reviewerForm/${params.getValue(params.id, "id")}`,
        })
        // if(){
        //     props.history.push({
        //         pathname: `/reviewerForm/${params.getValue(params.id, "id")}`,
        //     })
        // }
        // else{
        //     props.history.push({
        //         pathname: `/reviewerForm/view/${params.getValue(params.id, "id")}`,
        //     })
        // }

    }
    useEffect(() => {
        setColumns(
            [
                ...columns,
                {
                    field: ' ',
                    width: 120,
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
                            Open
                        </Button>

                    ),
                },

            ]
        )
    }, [])

    const pendingReviewsRows = [];
    const reviewedReviewsRows= [];
    for(var i = 0; i < reports.length; i++){
        if(parseInt(reports[i].yearOfReport) === new Date().getFullYear())
            pendingReviewsRows.push({id: reports[i].reportId , reportName: reports[i].reportName, yearOfReport: reports[i].yearOfReport, facultyName: reports[i].facultyName, emailAddress : reports[i].emailAddress, reviewStatus: reports[i].reviewStatus});
    }

    for(var i = 0; i < reports.length; i++){
        console.log("My date")
        console.log(reports[i].yearOfReport)
        console.log("Your date")
        console.log(new Date().getFullYear())
        if(parseInt(reports[i].yearOfReport) < parseInt(new Date().getFullYear()))
            reviewedReviewsRows.push({id: reports[i].reportId , reportName: reports[i].reportName, yearOfReport: reports[i].yearOfReport, facultyName: reports[i].facultyName,  emailAddress : reports[i].emailAddress, reviewStatus: reports[i].reviewStatus});
    }
    return(
        <div className={classes.main}>
            <div className={classes.root}>
                <Navbar userrole={props.user.role} active="Assigned Reports" match={props.match} user={props.user} history={props.history}/>
                <div className={classes.heading}>
                    Current Year's Reports
                </div>

                <DataGrid
                    rows={pendingReviewsRows}
                    columns={columns}
                    pageSize={4}
                    disableSelectionOnClick
                    className={classes.dataGrid}
                    components={{
                        Toolbar: GridToolbar,
                    }}

                />
                <div className={classes.heading}>
                    Previous Year's Reports
                </div>

                <DataGrid
                    rows={reviewedReviewsRows}
                    columns={columns}
                    pageSize={4}
                    disableSelectionOnClick
                    className={classes.dataGrid}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />

            </div>
        </div>

    )
}

export default ReviewerReports;