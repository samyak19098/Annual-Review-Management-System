import React, {Component, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import '@fontsource/roboto'
import {makeStyles, TextField} from "@material-ui/core";
import Navbar from './Navbar.js'
import {BrowserRouter, Link, MemoryRouter, Route, Switch} from 'react-router-dom';
import ProfileForm from "./ProfileForm";
import Axios from "axios";
import Cookies from "js-cookie";
import {brown} from "@material-ui/core/colors";
import {profileFields, userUpdatableFields} from "./HardCode";
import Unauthorized from "./Unauthorized";
import ProfileViewFaculty from "./ProfileViewFaculty";
import ProfileViewReviewer from "./ProfileViewReviewer";
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            toppadding: theme.spacing(2),
            width: '80%',
            // display: "block"
        },
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        backgroundSize: 'cover',
        position: 'absolute'
    },
    // parent:{
    //     overflow: "hidden"
    // },
    profileDiv : {
        alignItems: 'center',
        marginTop: '3%',
        backgroundColor: 'white',
        marginBottom: '10%',
        width: '85%',
        height: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        // backgroundColor: 'white',
        borderWidth: 10,
        borderRadius: 15,
        borderBlockEndColor: 'black',
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, 0.8)',
        // overflow: 'auto',
        overflowX: "hidden",
        overflowY: 'auto'
        // overflowY: 'hidden',




    },
    heading: {
        // color: 'white',
        paddingTop: '5%',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 25,
        paddingLeft: '3%'
        // fontFamily: 'Times New Roman'
    },
    textField :{
        marginLeft: "auto",
        marginRight: "auto",
        width: '4%'

    },
    button: {

        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: '#3D2C8D',
        color: 'white',

    },
    buttonDiv: {


        // paddingBottom: '5%',
        marginLeft: "auto",
        marginRight: "auto",
    },
}));

function ProfileView(props) {
    let element = <Unauthorized/>;

    if(props.user.role == 'prof') {
        element = <ProfileViewFaculty {...props}/>;
    } else if(props.user.role == 'reviewer') {
        element = <ProfileViewReviewer {...props}/>;
    }

    return element;
    // const classes = useStyles();
    // const urlParams = props.match.params;
    // const [profile, setProfile] = useState({});
    // const facultyTableList = ["dofa", "admin", "prof", "doaa", "hod"];
    //
    // useEffect(() => {
    //     const user = props.user;
    //     var table = ""
    //     if(facultyTableList.includes(user.role)) {
    //         table = "faculty"
    //     } else {
    //         table = "reviewer";
    //     }
    //     fetch(`http://localhost:3001/api/profile/${table}/${user.role}/${user.id}`, {
    //         method: "get",
    //         credentials: "include"
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data.status == "ERR") {
    //                 return;
    //             }
    //             Object.keys(data.result).forEach(function(key){
    //                 if(data.result[key] == null) {
    //                     if(key == "doj") {
    //                         data.result[key] = "1900-01-01";
    //                     } else {
    //                         data.result[key] = "";
    //                     }
    //                 }
    //             });
    //             setProfile(data.result)
    //         });
    // }, []);
    //
    //
    // function handleChange(event) {
    //     event.persist();
    //     console.log(event); // If there is no change happening, this won't be logged
    //     setProfile({...profile, [event.target.id]: event.target.value});
    // }
    //
    // function getField(field){
    //     const element = (
    //         <div className="col-xl-4 col-lg-2 col-md-1 col-sm-6 col-8">
    //             <div className="form-group">
    //
    //                 {/*<input type="text" className="form-control" id="fullName"*/}
    //                 {/*       placeholder="Enter full name"/>*/}
    //                 <TextField variant='standard' className={classes.textField} id={field.id} label={field.label} type={field.type} value={field.value} InputProps={{readOnly: field.readOnly, disableUnderline: true}}/>
    //             </div>
    //             {/*<br/>*/}
    //         </div>
    //     );
    //     return element;
    // }
    //
    //
    // function renderFields(fieldsList){
    //
    //     const renderElement = (
    //         <div className={classes.root}>
    //             <Navbar userrole={props.user.role} active="Profile" match={props.match} user={props.user} history={props.history}/>
    //             {/*<div className={classes.parent}>*/}
    //                 <div className={classes.profileDiv}>
    //                     <div>
    //                         <div className="row gutters">
    //                             <div className="col-xl-4 col-lg-10 col-md-8 col-sm-8 col-22">
    //                                 {/*<div>*/}
    //                                 {/*<div>*/}
    //                                 <div className="account-settings">
    //                                     <div className="user-profile">
    //                                         <div className="user-avatar" align="center" style={{marginTop:"10%", padding:"5%"}}>
    //                                             <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
    //                                                  alt="Maxwell Admin"/>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 {/*</div>*/}
    //                                 {/*</div>*/}
    //                             </div>
    //                             <div className="col-xl-8 col-lg-10 col-md-8 col-sm-8 col-22">
    //                                 {/*<div>*/}
    //                                 {/*<div>*/}
    //                                 <div className="row gutters">
    //                                     <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
    //                                         <h5 className={classes.heading}>Personal Details</h5>
    //                                     </div>
    //                                     {
    //                                         Object.keys(profile).map((attribute) => {
    //                                             var field = Object.assign({}, profileFields[attribute]);
    //                                             field.value = profile[attribute];
    //                                             return getField(field);
    //                                         })
    //                                     }
    //                                 </div>
    //
    //
    //                                 <div className="row gutters">
    //                                     <div className={classes.buttonDiv}>
    //                                         <Button className={classes.button} variant="contained" component={Link} to={`/profile/edit`}>
    //                                             EDIT PROFILE
    //                                         </Button>
    //                                     </div>
    //                                 </div>
    //                                 {/*</div>*/}
    //                                 {/*</div>*/}
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                 </div>
    //             {/*</div>*/}
    //
    //
    //         </div>
    //     );
    //
    //     return renderElement;
    // }
    //
    //
    // return (
    //     renderFields(profileFields)
    // );

}

export default ProfileView;