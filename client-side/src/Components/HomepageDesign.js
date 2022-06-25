import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import homepageIllustration from '../images/homepage_illustration.jpg'
import laptopIllustration from '../images/laptop_illustration.png'
import {Typography} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Text, StyleSheet} from "react-native";
import Button from "@material-ui/core/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {Container, InputAdornment} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Home, Visibility, VisibilityOff} from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import background from "../images/img.png";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../images/logo.png';
import '../style/navbar.scss';

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
const style = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // border: '2px solid red',
    justifyContent: 'center',
    alignItems: 'center',
    // lineHeight: '100vh',
    // userSelect: 'none',
};

function HomepageDesign(props) {
    const classes = useStyles();
    const defaultLogin = {
        username: "",
        password: ""
    };
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginDetails, setLoginDetails] = useState(defaultLogin);


    const handleClickOpen = () => {
        props.history.push('/login');
        // setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(event) {
        event.persist();
        console.log(event); // If there is no change happening, this won't be logged
        setLoginDetails({...loginDetails, [event.target.id]: event.target.value});
    }
    function handleClickShowPassword() {
        setShowPassword((!showPassword));
    }

    function handleMouseDownPassword() {
        setShowPassword((!showPassword));
    }
    const element = (
        <div>
            <div>
                <Navbar bg="white" expand="lg">
                    <Navbar.Brand href="https://www.iiitd.ac.in/">
                        <img src={logo} alt="IIITD logo" width={'80px'}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav.Item>
                            <Nav.Link href="#home">HOME</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#link">ABOUT</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#link">TEAM</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#link">FEEDBACK</Nav.Link>
                        </Nav.Item>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 0, sm: 0, md: 0, lg: 0 }} >
                    <Grid item xs={12} sm={12} md={5} key={0}>
                        <div style={style}>
                            <div style={{width: '400px'}}>
                                {/*<Text style={{fontSize: '40px', color: 'blue'}}>Welcome to ARMS</Text> <br/>*/}
                                <Typography variant="h3" style={{color: 'blue'}}>Welcome to ARMS</Typography> <br/>
                                <Typography variant="h5" style={{color: 'black'}}>Annual Review Management System</Typography> <br/>
                                {/*<Text style={{fontSize: '20px', color: 'black'}}>Annual Review Management System</Text> <br/>*/}
                                <Text style={{fontSize: '18px', color: 'gray'}}>
                                    ARMS is a faculty review management system developed by IIITD for managing
                                    the process of annual review of the faculty.
                                </Text> <br/><br/>
                                <Button variant='contained' color='primary' onClick={handleClickOpen}>Sign In</Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Sign In</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Enter your details to sign in.
                                        </DialogContentText>
                                        <br/>
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

                                            <FormControlLabel
                                                control={<Checkbox value="remember" color="primary" />}
                                                label="Remember me"
                                            />
                                        </form>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleClose}>Sign In</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={7} key={1}>
                        <div style={style}>
                            <img src={homepageIllustration} style={{width: '100%', height: '100%'}}/>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={7} key={1}>
                        <div style={style}>
                            <img src={laptopIllustration} style={{width: '100%', height: '100%'}}/>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} key={0}>
                        <div style={style}>
                            <div style={{width: '400px'}}>
                                <Text style={{fontSize: '40px', color: 'blue'}}>FEATURE</Text> <br/>
                                <Text style={{fontSize: '20px', color: 'black'}}>
                                    Very short description/advantage of feature
                                </Text> <br/>
                                {/*<Text style={{fontSize: '16px', color: 'gray'}}>*/}
                                {/*    Describe the feature*/}
                                {/*</Text>*/}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )

    return element;
}

export default HomepageDesign;