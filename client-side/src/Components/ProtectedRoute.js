import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Unauthorized from "./Unauthorized";

const ProtectedRoute = ({component: Component, allowedRoles, ...rest}) => {
    const [user, setUser] = useState({
        status: false,
        role: '',
        id: -1,
    });
    useEffect(() => {
        fetch(`http://localhost:3001/api/test`, {
            method: "get",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("User in protected route:");
                console.log(data);
                setUser({
                    status: data.status,
                    role: data.userRole,
                    id: data.userId,
                })
            });
    }, []);

    return (
        <Route {...rest} render={
            props => {
                // console.log(Component);
                console.log("In protected route user:")
                console.log(user);
                if (user.status && allowedRoles.includes(user.role)) {
                    // return <h1>What!?</h1>
                    // var resource = resourceAccessCheck();
                    return <Component {...rest} {...props} user={user}/>
                } else {
                    console.log("In protected route user:")
                    console.log(user);
                    return <Unauthorized/>
                }
            }
        }/>
    )
}

export default ProtectedRoute;