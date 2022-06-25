import React, {useEffect, useState} from 'react';
import '../style/profileView.css';
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Navbar from "./Navbar";
// import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles(() => ({
    field: {
        color: 'red',
    }
}));
const styles = {
    field: {
        color: 'red',
    }
}

function ProfileViewReviewer(props) {
    // const classes = useStyles()
    const urlParams = props.match.params;
    const [profile, setProfile] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        emailAddress: '',
        phoneNumber: '',
        organization: '',
        designation: '',
        primaryDepartment: '',
        secondaryDepartment: '',
        researchAreas: '',
    });
    const facultyTableList = ["dofa", "admin", "prof", "doaa", "hod"];

    useEffect(() => {
        const user = props.user;
        var table = ""
        if(facultyTableList.includes(user.role)) {
            table = "faculty"
        } else {
            table = "reviewer";
        }
        fetch(`http://localhost:3001/api/profile/${table}/${user.role}/${user.id}`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "ERR") {
                    return;
                }
                Object.keys(data.result).forEach(function(key){
                    if(data.result[key] == null) {
                        if(key == "doj") {
                            data.result[key] = "1900-01-01";
                        } else {
                            data.result[key] = "";
                        }
                    }
                });
                setProfile(data.result)
            });
    }, []);


    function handleChange(event) {
        event.persist();
        console.log(event); // If there is no change happening, this won't be logged
        setProfile({...profile, [event.target.id]: event.target.value});
    }

    return (
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
                                <div className="row field-head">
                                    <div className="col-4">
                                        <h5 className="mb-0">First Name</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="mb-0">Middle Name</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="mb-0">Last Name</h5>
                                    </div>
                                    <div className="col-4 field-value">{profile.firstName}</div>
                                    <div className="col-4 field-value">{profile.middleName}</div>
                                    <div className="col-4 field-value">{profile.lastName}</div>
                                </div>
                                <hr />
                                <div className="row field-head">
                                    <div className="col-4">
                                        <h5 className="mb-0">Designation</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="mb-0">Primary Department</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="mb-0">Secondary Department</h5>
                                    </div>
                                    <div className="col-4 field-value">{profile.designation}</div>
                                    <div className="col-4 field-value">{profile.primaryDepartment}</div>
                                    <div className="col-4 field-value">{profile.secondaryDepartment}</div>
                                </div>
                                <hr/>
                                <div className="row field-head">
                                    <div className="col-4">
                                        <h5 className="mb-0">Email</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="mb-0">Phone</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="mb-0"></h5>
                                    </div>
                                    <div className="col-4 field-value">{profile.emailAddress}</div>
                                    <div className="col-4 field-value">{profile.phoneNumber}</div>
                                    <div className="col-4 field-value"></div>
                                </div>
                                <hr />
                                <div className="row field-head">
                                    <div className="col-4">
                                        <h5 className="mb-0">Gender</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="mb-0">Organization</h5>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="mb-0"></h5>
                                    </div>
                                    <div className="col-4 field-value">{profile.gender}</div>
                                    <div className="col-4 field-value">{profile.organization}</div>
                                    <div className="col-4 field-value"></div>
                                </div>
                                <hr/>
                                <div className="row field-head">
                                    <div className="col-4">
                                        <h5 className="mb-0">Research Areas</h5>
                                    </div>
                                    <div className="col-8 field-value">
                                        {profile.researchAreas}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12">
                                        <a
                                            className="btn btn-info "
                                            target="__blank"
                                            onClick={() => {
                                                props.history.push('/profile/edit');
                                            }}
                                        >
                                            Edit
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileViewReviewer;