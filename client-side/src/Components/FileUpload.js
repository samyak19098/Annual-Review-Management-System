import React, {Component, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import '@fontsource/roboto'
import {makeStyles, TextField} from "@material-ui/core";
import Navbar from './Navbar.js'
import {BrowserRouter, Link, MemoryRouter, Route, Switch} from 'react-router-dom';
import Axios from "axios";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import download from 'downloadjs';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';

const inlist = [
    // {
    //     id: 'a',
    //     name: 'Robin',
    // },

];


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            // width: '40%',
            align: "center",
            // display: "block"
        },
        paddingLeft: "10%",
    },

    root2: {
        maxWidth: "70%",
        padding: 10,
        margin: 10
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    hide:{
        position: "absolute",
        top:-1,
        left:-1,
        width:1,
        height:1
    }

}));

function FileUpload(props){

    const classes = useStyles();
    const [name, setName] = useState("");
    const [fileList, setFileList] = useState([]);
    const [user, setUser] = useState({status: false, id: -1});
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/api/test`, {method: "get", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                setUser({status: false, id: data.userId})
            });
    }, []);


    useEffect(() => {
        handleRefresh(null);
    }, [fileList]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/`, {method: "get", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                console.log("Here i am  ");
                fetch(`http://localhost:3001/api/uploadfiles/${user.id}`, {
                    method: "get",
                    credentials: "include"
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.status == "EMPTY") {
                            return;
                        }
                        console.log(data.result);
                        var fileList_toSet = data.result.sort((a, b) => (a.submissionDate < b.submissionDate) ? 1 : -1)
                        // list.sort((a, b) => (a.color > b.color) ? 1 : -1)

                        console.log("IN UPLOAD REPORT !")
                        setFileList(fileList_toSet);
                    });
            });
    }, [user]);

    function handleChange(event) {
        // track input field's state
        setName(event.target.value);
    }
    function handleAdd() {
        // add item
        const newList = fileList.concat({name});
        setFileList(newList);
        setName('');

    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    function handleRefresh() {
        fetch(`http://localhost:3001/api/`, {method: "get", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                console.log("Here i am  ");
                fetch(`http://localhost:3001/api/uploadfiles/${user.id}`, {
                    method: "get",
                    credentials: "include"
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.status == "EMPTY") {
                            return;
                        }
                        console.log(data.result);
                        var file_to_Set = data.result.sort((a, b) => (a.submissionDate < b.submissionDate) ? 1 : -1);
                        setFileList(data.result);
                        console.log("Here in uploadfile fetch ");
                    });
            });
    }

    function handleDownload(fileName){
        console.log("Generated File name : " + fileName);
        fetch(`http://localhost:3001/api/report/downloadfile/${fileName}`, {
            method: "get",
            credentials: "include"
        }).then((res) => res.blob())
            .then((res) => {
                download(res,"testing.pdf");
            });
    }

    function getCurrentYearString(){
        const date = new Date();
        const year = date.getFullYear();
        console.log(typeof year);
        return year.toString();
    }

    const addCard = () => {
        return(
            <div>
                <Card className={classes.root2} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Remove</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }

    let previous_style = {
        margin : '20px',
        padding: '10px',
    }
    let upload_style = {

    }
    let style = {
        mainContainer: {
            display:'flex',
            minHeight: '100%',
            paddingTop: '2%',
        },
        leftPane: {
            width: '50%',
            minHeight:'100%',
        },
        rightPane: {
            width: '50%',
            minHeight:'100%',
            // backgroundColor: 'red',
        }
    }
    return(
        <div>
            {/*action={`http://localhost:3001/report/uploadfile/${urlParams.id}`}*/}
            <Navbar userrole={props.user.role} active="Report" match={props.match} user={props.user} history={props.history}/>
            <iframe name="hiddenFrame" className={classes.hide}></iframe>
            <div className='main-container' style={style.mainContainer}>
                <div className='upload-class' style={style.leftPane}>
                    <form className={classes.root} action={`http://localhost:3001/report/uploadfile/${user.id}`} encType="multipart/form-data" method="POST" target="hiddenFrame">
                        <Typography variant='h4'> Please Upload your Report </Typography>
                        <hr></hr>
                        <TextField type="file" variant="outlined" name="report" value={name} onChange={handleChange}/><br/>
                        <Button type="submit" variant="contained" color="success" style={{margin:'15px'}}>Save</Button>
                        <IconButton onClick={handleRefresh}>
                            <RefreshIcon/>
                        </IconButton>
                        {/*<RefreshIcon onClick={handleRefresh} style={{margin:'15px', cursor:'hover'}}></RefreshIcon>*/}
                        <Typography variant='h6'><NotificationsActiveIcon/>   Deadline : 31 January, 2022</Typography>
                        {/*<Button variant="outlined" onClick={handleRefresh} style={{margin:'15px'}}>Refresh</Button>*/}
                    </form>
                </div>
                <div className='previous-year' style={style.rightPane}>
                    <Typography variant='h4'>Uploaded Reports</Typography>
                    <hr></hr>
                    <div style={{overflowY:'scroll', height:'74vh'}}>
                        <ul>
                            {fileList.map((item) => {
                                    return (
                                        //     <p>hello</p>
                                        <Card className={classes.root2} variant="outlined" key = {item.id} style={{
                                            border: ((getCurrentYearString() == item.submissionDate) ? "5px solid black" : "black"),
                                            backgroundColor: ((getCurrentYearString() == item.submissionDate) ? "#dcecf7" : "white"),
                                        }}>
                                            <CardContent>
                                                <Typography variant="h5" component="h2">
                                                    {item.fileName}
                                                </Typography>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    <Box sx={{ fontWeight: 'bold', m: 1 }}>{item.submissionDate}</Box>
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                {/*<Button size="small">Remove</Button>*/}
                                                <Button size="small" onClick={() => handleDownload(item.generatedFileName)}>Download</Button>
                                            </CardActions>
                                        </Card>
                                    )
                                }
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FileUpload;