import React, {Component, useEffect, useState} from 'react';
// import {DataGrid, GridRowId} from '@material-ui/data-grid';
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
import {facultyDetailsColumns} from "./HardCode";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

const useStyles = makeStyles((theme) => {
    return ({
        main: {
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            // backgroundImage: `url(${background})`,
            // background: "no-repeat",
            backgroundSize: "cover",
            position: 'absolute',



            // backgroundColor: '#3DADA9',
        },
        root: {
            // marginTop: '5%',
            height: '80%',
            width: '95%',
            paddingLeft:'5%',
            backgroundPosition: 'center-fixed'
        },
        root2: {
            '& .MuiAvatar-img': {
                width: '100%',
                height: '100%',
            },
            height: '70%',
            width: '70%'
        },
        dataGrid:{
            backgroundColor: 'white',
            borderRadius: 15,
            // border: 'solid',
            boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, .6)',
            // borderColor: 'white'
            height: '70%'

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

function ViewFacultyList(props){
    const classes = useStyles()
    const [id, setId] = useState(1);
    const [profile, setProfile] = useState("");
    const [facultyDetails, setFacultyDetails] = useState([]);
    const [user, setUser] = useState({id: -1, role: "", table: ""});
    const defaultColumns = JSON.parse(JSON.stringify(facultyDetailsColumns));
    const [columns, setColumns] = useState(defaultColumns);
    useEffect(()=>{

    }, [facultyDetails]);
    useEffect(() => {
        setUser({id: props.user.id, role: props.user.role, table: "reviewer"})
        fetch(`http://localhost:3001/api/getFacultyDetails`).then((res) => res.json()).then((data) => {
            console.log(data);
            setFacultyDetails(data.result);
        });
    }, []);


    function handleClickGroup(params){
        console.log("helloman here i am")
        // props.history.push(`/reviewerForm`);
        props.history.push({
            pathname: `/admin/updateFaculty/${params.getValue(params.id, "id")}`,
        })
    }
    useEffect(() => {
        setColumns(
            [
                ...columns,
                {
                    field: ' ',
                    width: 300,
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
                            View and Update Profile
                        </Button>

                    ),
                },
            ]
        )
    }, [])
    const facultyDetailsRows = [];
    for(var i = 0; i < facultyDetails.length; i++){
        var fullName = getFullName(facultyDetails[i].firstName, facultyDetails[i].middleName, facultyDetails[i].lastName)
        facultyDetailsRows.push({id: facultyDetails[i].id, fullName: fullName, firstName: facultyDetails[i].firstName, middleName: facultyDetails[i].middleName, lastName: facultyDetails[i].lastName,   emailAddress : facultyDetails[i].emailAddress, phoneNumber: facultyDetails[i].phoneNumber, primaryDepartment: facultyDetails[i].primaryDepartment, secondaryDepartment: facultyDetails[i].secondaryDepartment, role: facultyDetails[i].role, designation: facultyDetails[i].designation, gender: facultyDetails[i].gender, researchAreas: facultyDetails[i].researchAreas, empId: facultyDetails[i].empId, phd: facultyDetails[i].phd , doj: facultyDetails.doj});
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



    return(
        <div className={classes.main}>
            <div className={classes.root}>
                <Navbar userrole={props.user.role} active="View Faculties" match={props.match} user={props.user} history={props.history}/>
                <div className={classes.heading}>
                    Faculty
                </div>

                <DataGrid
                    rows={facultyDetailsRows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    className={classes.dataGrid}
                    components={{
                        Toolbar: GridToolbar,
                    }}

                />
                {/*<div className={classes.heading}>*/}
                {/*    Previous Year's Reports*/}
                {/*</div>*/}

                {/*<DataGrid*/}
                {/*    //rows={}*/}
                {/*    columns={columns}*/}
                {/*    pageSize={4}*/}
                {/*    disableSelectionOnClick*/}
                {/*    className={classes.dataGrid}*/}
                {/*/>*/}

            </div>
        </div>

    )



}

export default ViewFacultyList;
