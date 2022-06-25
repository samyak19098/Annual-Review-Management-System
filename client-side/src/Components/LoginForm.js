
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
import background from "../images/img.png";
import Logo from '../images/IIITDLOGO.png';
import {InputAdornment} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import GoogleLogin from "react-google-login";



const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: "100% 100%",
        backgroundPosition: 'center-fixed',

    },
    logo :{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center-fixed',
        height: "80%",
        width: "80%",

    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    heading: {
        fontFamily: "Georgia",
        fontSize: '255%',
        fontWeight: 'bold',
    },
    text: {
        fontFamily: "Georgia",
    }
}));

export default function SignInSide(props) {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const defaultLogin = {
        username: "",
        password: ""
    };
    const [loginDetails, setLoginDetails] = useState(defaultLogin);

    function handleChange(event) {
        event.persist();
        console.log(event); // If there is no change happening, this won't be logged
        setLoginDetails({...loginDetails, [event.target.id]: event.target.value});

    }

    function loginButton(){
        console.log(loginDetails);
        Axios.defaults.withCredentials = true;
        Axios.post(`http://localhost:3001/api/login`, loginDetails)
            .then(res => {
                console.log(res.data);
                console.log("Here is");
                // console.log(document.cookie);
                console.log(res.data);
                if(res.data == "success"){
                    props.handleLogin();
                    props.history.push("/home");
                }
                else{
                    console.log("failure");
                    props.history.push("/unauthorized");
                }
            })
    }

    function handleClickShowPassword() {
        setShowPassword((!showPassword));
    }

    function handleMouseDownPassword() {
        setShowPassword((!showPassword));
    }
    function getCreditString() {
        const element =
            <React.Fragment>
        <Typography variant="h6">Implemented by <a href="http://www.google.com" style={{textDecoration:"none"}}>Samyak Jain</a>, <a href="http://www.google.com" style={{textDecoration:"none"}}>Parth Chhabra</a> and <a href="http://www.google.com" style={{textDecoration:"none"}}>Sarthak Johari</a>
        </Typography>
            </React.Fragment>
        return element

    }
    async function handleFailure(googleData) {
        console.log("Failed!");
    }

    async function handleLogin(googleData) {

        Axios.defaults.withCredentials = true;
        Axios.post(`http://localhost:3001/api/v1/auth/google`, {token: googleData.tokenId})
            .then(res => {
                console.log(res.data);
                console.log("Here is");
                console.log(document.cookie);
                if(res.data == "success"){
                    props.handleLogin();
                    props.history.push("/home");
                    console.log("Success!!");
                }
                else{
                    // console.log("failure");
                    props.history.push("/unauthorized");
                    console.log("Failure!!");
                }
            })

        // const res = await fetch("http://localhost:3001/api/v1/auth/google", {
        //     method: "POST",
        //     credentials: "include",
        //     body: JSON.stringify({
        //         token: googleData.tokenId
        //     }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });
        // const data = await res.json();
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src={Logo} className={classes.logo} alt="Logo"/>
                    <h1 className={classes.heading} align="center">ARMS - IIITD</h1>
                    <h3>Annual Review Management System (IIITD)</h3>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" className={classes.text}>
                        Log In
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            id="username"
                            label="Email Address"
                            value={loginDetails.username}
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            autoFocus
                            autoComplete
                            onChange={handleChange}/>
                        <TextField
                            id="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: (
                                    <InputAdornment position="end" label="Toggle Visibility">
                                        <IconButton

                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            value={loginDetails.password}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            onChange={handleChange}/>
                        <GoogleLogin
                            clientId={'549456913622-6hbfpv1lhevrmrvv9k9co5ghpl1iq6rh.apps.googleusercontent.com'}
                            buttonText="Log in with Google"
                            onSuccess={handleLogin}
                            onFailure={handleFailure}
                            cookiePolicy={'single_host_origin'}
                        /> <br/>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button variant="contained" fullWidth color="primary" onClick={loginButton}>Log In</Button>
                        {/*<Button*/}
                        {/*    type="submit"*/}
                        {/*    fullWidth*/}
                        {/*    variant="contained"*/}
                        {/*    color="primary"*/}
                        {/*    className={classes.submit}*/}
                        {/*>*/}
                        {/*    Sign In*/}
                        {/*</Button>*/}

                        <Grid alignItems = "center" container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>

                    </form>

                </div>
                <div className="footer" style={{
                    position: "relative",
                    padding:'3%',
                    marginTop:'8%',
                    backgroundColor: "",
                }}>
                    <hr/>
                    {getCreditString()}
                </div>
            </Grid>
        </Grid>
    );
}
