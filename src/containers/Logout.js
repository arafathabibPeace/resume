import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import useAuthentication from '../hooks/UseAuthentication';

function Logout(props) {
    const [, , logout] = useAuthentication()
    const isLoggedIn = sessionStorage.getItem('isAuth')

    useEffect(()=>{
        if(isLoggedIn===null){
            props.history.push('/')
        }
    },[isLoggedIn,props])
    const handleLogout = () => {
        logout()
        console.log(isLoggedIn)
    }



    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Logout;