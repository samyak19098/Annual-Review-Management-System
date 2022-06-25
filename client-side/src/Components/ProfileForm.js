import React, {Component, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import '@fontsource/roboto'
import {makeStyles, TextField} from "@material-ui/core";
import Navbar from './Navbar.js'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {facultyTableList, profileFields, userUpdatableFields} from "./HardCode";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {ToastContainer} from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import {profileFieldGrouping} from "./HardCode";



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            toppadding: theme.spacing(2),
            // width: '80%',
        },
        alignItems : "center",
        height: '100%',
        backgroundColor: 'white',
        backgroundSize: 'cover',
        position: 'absolute'

    },
    profileDiv : {
        alignItems: 'center',
        marginTop: '2%',
        width: '90%',
        height: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        borderWidth: 10,
        borderRadius: 15,
        borderBlockEndColor: 'black',
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .8)',
        overflowX: "hidden",
        overflowY: 'auto',
        // overflow: 'auto',

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
        width: '5%'

    },
    button: {

        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: '#3D2C8D',
        color: 'white',

    },
    buttonDiv: {
        paddingBottom: '5%',
        marginLeft: "auto",
        marginRight: "auto",
    },
}));
function ProfileForm(props) {
    const classes = useStyles();
    const defaultProfile = {
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        emailAddress: '',
        phoneNumber: '',
        organization: '',
        doj: '',
        designation: '',
        primaryDepartment: '',
        secondaryDepartment: '',
        researchAreas: '',
    };
    const urlParams = props.match.params;
    const [profile, setProfile] = useState(defaultProfile);
    const [user, setUser] = useState({id: -1, role: "", table: ""});
    const [open, setOpen] = useState(false);



    useEffect(() => {
        const user = props.user;
        var table = ""
        if(facultyTableList.includes(user.role)) {
            table = "faculty"
        } else {
            table = "reviewer";
        }
        setUser({id: user.id, role: user.role, table: table});

        fetch(`http://localhost:3001/api/profile/${table}/${user.role}/${user.id}`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "ERR") {
                    return;
                }
                Object.keys(data.result).forEach(function (key) {
                    if (data.result[key] == null) {
                        if (key == "doj") {
                            data.result[key] = "1900-01-01";
                        } else {
                            data.result[key] = "";
                        }
                    }
                });
                setProfile(data.result)
            });
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(event) {
        event.persist();
        console.log(event); // If there is no change happening, this won't be logged
        setProfile({...profile, [event.target.id]: event.target.value});
    }

    function saveButton(){
        Axios.post(`http://localhost:3001/api/profile/update/${user.table}/${user.role}/${user.id}`, profile)
            .then(res => {
                props.history.push(`/profile/view`);
            })
    }


    function getField(grouping){
        const element = (
            <div>
                <div className="row field-head">
                    {
                        grouping.map((group) => {
                            return (
                                Object.keys(group).map((key) => {
                                    const field = Object.assign({}, group[key]);
                                    field.value = profile[key];
                                    if(userUpdatableFields.includes(key)) {
                                        field.readOnly = false;
                                    }
                                    console.log(`Key is`);
                                    console.log(field)
                                    return (
                                        <div className="col-4">
                                            <TextField disabled={field.readOnly} variant='standard' id={field.id} label={field.label} type={field.type} value={field.value} InputProps={{readOnly: field.readOnly}} onChange={handleChange}/>
                                        </div>
                                    )
                                })
                            )
                        })
                    }
                </div>
                <br/><br/>
            </div>
        );
        return element;
    }

    function renderFields(fieldsList){
        const renderElement = (
            // <div className={classes.root}>
            //     <Navbar userrole={props.user.role} active="Profile" match={props.match} user={props.user} history={props.history}/>
            //     <div className={classes.profileDiv}>
            //         <div className="row gutters">
            //             <div className="col-xl-4 col-lg-50 col-md-8 col-sm-8 col-10">
            //                 <div >
            //                     <div>
            //                         <div className="account-settings">
            //                             <div className="user-profile">
            //                                 <div className="user-avatar" align="center" >
            //                                     <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
            //                                          alt="Maxwell Admin"/>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //             <div className="col-xl-8 col-lg-10 col-md-8 col-sm-8 col-22">
            //                 <div >
            //                     <div>
            //                         <div className="row gutters">
            //                             <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            //                                 <h5 className={classes.heading}>Personal Details</h5>
            //                             </div>
            //                             {
            //                                 Object.keys(profile).map((attribute) => {
            //                                     var field = Object.assign({}, profileFields[attribute]);
            //                                     field.value = profile[attribute];
            //                                     if(userUpdatableFields.includes(attribute)) {
            //                                         field.readOnly = false;
            //                                     }
            //                                     return getField(field);
            //                                 })
            //                             }
            //                         </div>
            //
            //
            //                         <div className="row gutters">
            //                             <div className={classes.buttonDiv}>
            //
            //                                 <Button className={classes.button} variant="contained" onClick={handleClickOpen}>Save Changes</Button>
            //
            //                             </div>
            //                         </div>
            //                         <Dialog
            //
            //                             open={open}
            //                             onClose={handleClose}
            //                             aria-labelledby="alert-dialog-title"
            //                             aria-describedby="alert-dialog-description"
            //                         >
            //                             <DialogTitle id="alert-dialog-title">{"Are you sure you want to change the account details?"}</DialogTitle>
            //                             <DialogContent>
            //                                 <DialogContentText id="alert-dialog-description">
            //                                     On clicking "YES", The account details will be updated.
            //                                 </DialogContentText>
            //                             </DialogContent>
            //                             <DialogActions>
            //                                 <Button onClick={handleClose} color="primary">
            //                                     Cancel
            //                                 </Button>
            //                                 <Button onClick={saveButton} color="primary">
            //                                     Yes
            //                                 </Button>
            //                                 <ToastContainer
            //
            //                                     position="top-center"
            //                                     autoClose={5000}
            //                                     hideProgressBar={false}
            //                                     newestOnTop={false}
            //                                     closeOnClick
            //                                     rtl={false}
            //                                     pauseOnFocusLoss
            //                                     draggable
            //                                     pauseOnHover
            //                                 />
            //                             </DialogActions>
            //                         </Dialog>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //
            // </div>



        <div className="container">
            <Navbar userrole={props.user.role} active="Profile" match={props.match} user={props.user} history={props.history}/>
            <div className="main-body" style={{marginTop: '50px'}}>
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card"  style={{height: '100%'}}>
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img
                                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                        alt="Admin"
                                        className="rounded-circle"
                                        width={250}
                                    />
                                    <div className="mt-3">
                                        <h4>{`${profile.firstName} ${profile.middleName} ${profile.lastName}`}</h4>
                                        <p className="field-value mb-1">{profile.designation}</p>
                                        <p className="field-value font-size-sm">
                                            {profile.emailAddress}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3" >
                            <div className="card-body">

                                {
                                    // Object.keys(profileFieldGrouping[props.user.role]).map((attribute) => {
                                    //     var field = Object.assign({}, profileFields[attribute]);
                                    //     field.value = profile[attribute];
                                    //     if(userUpdatableFields.includes(attribute)) {
                                    //         field.readOnly = false;
                                    //     }
                                    //     return getField(field);
                                    // })
                                    profileFieldGrouping[props.user.role].map((grouping) => {
                                        return (
                                            getField(grouping)
                                        )
                                    })
                                }
                                <div className="row gutters">
                                    <div className={classes.buttonDiv}>

                                        <Button className={classes.button} variant="contained" onClick={handleClickOpen}>Save Changes</Button>

                                    </div>
                                </div>
                                <Dialog

                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to change the account details?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            On clicking "YES", The account details will be updated.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={saveButton} color="primary">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );

        return renderElement;
    }

    return (
        renderFields(profileFields)
    );
}

export default ProfileForm;