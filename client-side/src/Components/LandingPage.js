import React, {Component, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import '@fontsource/roboto'
import {makeStyles, TextField} from "@material-ui/core";
import Navbar from './Navbar.js'
import {BrowserRouter, Link, MemoryRouter, Route, Switch} from 'react-router-dom';
import Axios from "axios";
import Typography from '@material-ui/core/Typography';
import {Label} from "@material-ui/icons";
import Box from '@material-ui/core/Box';
import background from "../images/new1.jpg";
import WordArt from 'react-wordart'
import Logo from "../images/logo.png";
import {Carousel} from "react-responsive-carousel";
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import iiitd1 from '../images/institute18-1.png'
import iiitd2 from '../images/institute18-2.png'
import iiitd3 from '../images/institute18-3.png'
import {quotes} from './HardCode.js'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '120vh',
        // backgroundImage: `url(${background})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundColor: 'white'
        //     theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        // backgroundSize: "100% 100%",
        // backgroundPosition: 'center-fixed',
    },
    quote: {
        // border: 'solid',
        // borderWidth: 2,
        // borderRadius: 10,
        // borderTopColor: 'white'
    },
    root2: {
        marginLeft: "auto",
        marginRight: "auto"
    }
    ,
    image: {

        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        // backgroundSize: "100% 300%",
        backgroundPosition: 'center-top',
        width: '100%',
        height: '100%'

    },
    logo: {
        paddingLeft: '30%',
        height: "70%",
        width: "70%",
        // backgroundSize: "10% 10%",
    },

    heading: {
        color: 'black', // <-- The magic
        textAlign: 'center', // <-- The magic
        fontWeight: 'bold',
        fontSize: 50,
        fontFamily: 'Times New Roman'
    },


}));
function LandingPage(props){
    const classes = useStyles();
    const [ quote, setQuote ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [user, setUser] = useState({id: -1, role: "", table: ""})


    useEffect(() => {

        let quote_keys = Object.keys(quotes)
        const quote_key = quote_keys[(Math.floor(Math.random() * quote_keys.length))]
        setQuote(quotes[quote_key])
        setAuthor(quote_key)

    }, []);
    console.log(quote);
    // const handleClick = () => {
    //     getQuotes();
    // }
    return(
        <div >
            <div className={classes.root}>
                {/*getQuotes();*/}

                <Navbar userrole={props.user.role} active="Home" match={props.match} user={props.user} history={props.history}/>
                <Carousel autoPlay={true} interval={2000} infiniteLoop={true}>
                    <div>
                        {/*<div style={{width: '100vw', height: '70vh', backgroundColor: 'cyan'}}></div>*/}
                        <img src={iiitd1}/>
                        {/*<p className="legend">Legend 1</p>*/}
                    </div>
                    <div>
                        {/*<div style={{width: '100vw', height: '70vh', backgroundColor: 'yellow'}}></div>*/}
                        <img src={iiitd2}/>
                        {/*<p className="legend">Legend 2</p>*/}
                    </div>
                    <div>
                        {/*<div style={{width: '100vw', height: '70vh', backgroundColor: 'pink'}}></div>*/}
                        <img src={iiitd3}/>
                        {/*<p className="legend">Legend 3</p>*/}
                    </div>
                </Carousel>
                <div>

                    <div >
                        <h1 className={classes.heading} align="center">Welcome To Annual Review Management System<br/> </h1><br/><br/>

                        {/*<WordArt text='Welcome To Review Management System' theme={`rainbow`} fontSize={100} />*/}
                        <div>
                            <Box  fontSize={25} fontFamily="Times New Roman" fontStyle="oblique" variant="contained" align="center" variant="h5">{quote} - {author}</Box>
                        </div>
                    </div>
                    {/*<div className={classes.root2}>*/}
                    {/*    <img src={Logo} className={classes.logo} alt="Logo"/>*/}
                    {/*</div>*/}

                </div>

            </div>
        </div>


    )
}
export default LandingPage;

