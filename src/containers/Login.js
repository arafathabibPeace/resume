import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Authentication } from '../components/authentication/Authentication';

function Login(props) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const isLoggedIn = sessionStorage.getItem('isAuth')
    useEffect(() => {
        if (isLoggedIn !== null) {
            props.history.push('/main')
        }
    }, [isLoggedIn, props])
    const handleClickOpen = (action) => {

        if (action === 'login') {
            setTitle('Login')
        } else {
            setTitle('Sign Up')
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div>
            <Button variant="outlined" color="primary" onClick={() => handleClickOpen('login')}>
                Login
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleClickOpen('signup')}>
                Sign up
            </Button>
            <Authentication open={open} handleClose={handleClose} title={title} />
        </div>
    );
}

export default Login;