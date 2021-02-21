import React from 'react';
import { Route, Redirect } from 'react-router-dom';



export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = localStorage.getItem("login");
        const userRole = localStorage.getItem("role");
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        // if(userRole == 'delivery' )

        // authorised so return component
        return <Component {...props} />
    }} />
)