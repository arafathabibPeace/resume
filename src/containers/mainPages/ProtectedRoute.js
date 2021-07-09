import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  //const [,,,isLoggedIn] = useAuthentication()
  const isLoggedIn = sessionStorage.getItem('isAuth')
  console.log(isLoggedIn)
  return (
    <div>
      <Route {...rest} render={props => {
        if (isLoggedIn) {
          return <Component{...props} />
        } else {
          return (<Redirect to={{ pathname: '/', component: { from: props.location } }} />)
        }
      }} />
    </div>
  );
};
