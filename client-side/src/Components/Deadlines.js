import React, {Component, useEffect, useState} from 'react';
import Axios from "axios";
import Button from '@material-ui/core/Button';
import Navbar from "./Navbar";
import Typography from "@material-ui/core/Typography";
import {CardMedia, Divider} from "@mui/material";
import List from "@material-ui/core/List";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import DateTimePicker from 'react-datetime-picker';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
const styles = {
    header: {
        height:'10vh',
        margin: '3% 3% 1%',
        padding: '2%',
    },
    bodyContainer: {
        margin: '1% 4% 3%',
        padding: '1%',
        display: 'flex'
    }
}
const getCurrentYear = () => {
    return new Date().getFullYear();
}

function getDeadlineItem(){

}

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        },
        secondary :{
            main: "#ff0000"
        },
        action:{
            disabledBackground: '#FF0000',
            disabled: '#FF0000',

        }
    },
});

function Deadlines(props) {
    const [datetimeValue, setDatetimeValue] = useState(new Date());
    const [isFreezed, setIsFreezed] = useState(false);
    function freezeAssign() {
        console.log("FREEZING")
        setIsFreezed(!isFreezed);
        Axios.post('http://localhost:3001/api/timelines/freeze/assign/hod', {
            freezeType:'freezeHoD'
        })
            .then(res => {
                console.log("Response at hod: ");
                console.log(res)
                if(res.data == "OK"){
                    console.log("HoD- Inserted successfully")
                }
                else{
                    console.log("Failed HoD")
                }
            });

        Axios.post('http://localhost:3001/api/timelines/freeze/assign/doaa', {
            freezeType:'freezeDoAA'
        })
            .then(res => {
                console.log("Response at DOAA: ");
                console.log(res)
                if(res.data == "OK"){
                    console.log("DoAA- Inserted successfully")
                }
                else{
                    console.log("Failed DoAA")
                }
            });
        console.log("Report Assignment Freezed")
    }

    return(
        <div>
            <Navbar userrole={props.user.role} active="Manage Deadlines" match={props.match} user={props.user} history={props.history}/>
            <div className="header" style={styles.header}>
                <Typography variant='h4'>Deadlines for {getCurrentYear()}</Typography>
            </div>
            {/*<Divider/>*/}
            <Divider variant="middle" sx={{margin:'0.1% 5% 2%', backgroundColor:'#022742'}}/>
            <div className="body-container" style={styles.bodyContainer}>
                <Card style={{display:'flex', width:'100%', padding:'1%', marginTop:'1%', overflow:"visible"}}>
                    <CardContent style={{display:'flex', flexDirection:'column', width:'100%', padding:'1%', overflow:"visible"}}>

                        <Typography variant='h5' style={{margin:'0.1% 1% 1%'}}>Assign Reviewer</Typography>
                        <div className='functionality' style={{margin:'0.1% 1% 1%', display:'flex', width:'100%'}}>
                            <ThemeProvider theme={theme}>
                                <Button variant="outlined" color="secondary" onClick={()=>freezeAssign()} style={{margin:'0.1% 1% 1%', width:'10%', align:'center'}} endIcon={isFreezed ? <LockIcon/> : <LockOpenIcon/>} disabled={isFreezed}>
                                    {isFreezed ? 'Freezed' : 'Freeze'}
                                </Button>
                            </ThemeProvider>

                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Deadlines;