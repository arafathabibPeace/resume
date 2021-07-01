import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import UseUser from '../hooks/UseUser';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
}));

function Login(props) {
    const classes = useStyles();
    const [, login, , ,] = UseUser();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login({ email: username, password: password });
    }
    const loginForm = (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    variant="outlined"
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="on"
                />
            </div>
            <div><TextField
                id="outlined-password-input"
                label="Password *"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={e => setPassword(e.target.value)}

            /></div>
            <div className={classes.root}>
                <Button size="small" variant="contained" color="primary" onClick={e => handleSubmit(e)}>Login</Button>
            </div>
            <div style={{ padding: '20px' }}>
                Not yet registered? <Link href='/signup'>Sign Up</Link>
            </div>
        </form>

    )
    return (
        <div>
            {props.isAuth ? <Redirect to='/profile' /> : loginForm
            }

        </div>

    )
}



export default Login;