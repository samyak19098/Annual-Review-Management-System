import React from 'react';
import { Link } from 'react-router-dom';
import '../Unauthorized.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@material-ui/core/Box";



const Unauthorized = () => {
    return (
        <div className='container'>
            {/*<Box sx={{ display: 'flex' }}>*/}
                <div style={{
                    // alignItems: 'center',
                    // top: '50%',
                }}>
                    <CircularProgress style={{
                        flex: 1,
                        marginTop:240,
                        justifyContent: 'center',
                        alignItems:'center',
                        width: '150px',
                        height: '150px',
                    }}/>
                </div>
            {/*</Box>*/}
            {/*<div class="gandalf">*/}
            {/*    <div class="fireball"></div>*/}
            {/*    <div class="skirt"></div>*/}
            {/*    <div class="sleeves"></div>*/}
            {/*    <div class="shoulders">*/}
            {/*        <div class="hand left"></div>*/}
            {/*        <div class="hand right"></div>*/}
            {/*    </div>*/}
            {/*    <div class="head">*/}
            {/*        <div class="hair"></div>*/}
            {/*        <div class="beard"></div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div class="message">*/}
            {/*    <h1>403 - You Shall Not Pass</h1>*/}
            {/*    <p>Uh oh, Gandalf is blocking the way!<br />Maybe you have a typo in the url? Or you meant to go to a different location? Like...Hobbiton?</p>*/}
            {/*</div>*/}
            {/*<p><Link to='/'>Back to Home</Link></p>*/}
        </div>
    )
}

export default Unauthorized;