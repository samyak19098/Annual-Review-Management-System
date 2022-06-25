import React from "react";
import GoogleLogin from "react-google-login";
import GoogleLogout from 'react-google-login';
import Axios from "axios";

function GoogleAuth(props) {

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
    function handleSignOut() {
        Axios.delete('http://localhost:3001/api/v1/auth/logout', {});
    }
    const element = (
        <div>
            <GoogleLogin
                clientId={'549456913622-6hbfpv1lhevrmrvv9k9co5ghpl1iq6rh.apps.googleusercontent.com'}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
            />
            <GoogleLogout
                clientId={'549456913622-6hbfpv1lhevrmrvv9k9co5ghpl1iq6rh.apps.googleusercontent.com'}
                buttonText="Logout"
                onLogoutSuccess={(res) => {

                }}
                onFailure={(res) => {console.log("failure logout!")}}
                cookiePolicy={ 'single_host_origin' }
            />
        </div>
    )

    return element;
}

export default GoogleAuth;