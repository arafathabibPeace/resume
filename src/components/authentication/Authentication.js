import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useAuthentication from '../../hooks/UseAuthentication';

export const Authentication = (props) => {
    const { open, handleClose, title } = props
    const [login, signUp] = useAuthentication()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [usernameHelperText, setUsernameHelperText] = useState('')
    const [passwordHelperText, setPasswordHelperText] = useState('')
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('')

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const accessToken = sessionStorage.getItem('accessToken')

    useEffect(() => {
        if (email === null || email === '') {
            setUsernameHelperText('username is required')
        }
        if (password === null || password === '') {
            setPasswordHelperText('password is required')
        }
        if (confirmPassword === null || confirmPassword === '' || confirmPassword !== password) {
            setConfirmPasswordHelperText('confirm password is not matched')
        }
    }, [email, password, confirmPassword])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        if (title === 'Login') {
            if (email && password) {
                login({ email: email, password: password })
                handleClose()
            }
        }
        if (title === 'Sign Up' && email && password && confirmPassword) {
            if (password === confirmPassword) {
                if (email) {
                    signUp({ email: email, password: password })
                    handleClose()
                }
            }
        }
    }


    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off" onSubmit={e => handleSubmit(e)}>

                        <div>
                            <div><p>{accessToken ? accessToken : 'No'}</p>
                                <TextField
                                    id="outlined-helperText"
                                    label="Email"
                                    helperText={usernameHelperText}
                                    variant="outlined"
                                    onChange={e => setEmail(e.target.value)}
                                    style={{ paddingBottom: '30px', display: 'block' }}
                                   
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    helperText={passwordHelperText}
                                    type="password"
                                    variant="outlined"
                                    onChange={e => setPassword(e.target.value)}
                                    style={{ paddingBottom: '30px', display: 'block' }}
                                />
                                {title === 'Sign Up' ? <TextField
                                    id="outlined-password-input"
                                    label="Confirm Password"
                                    helperText={confirmPasswordHelperText}
                                    type="password"
                                    variant="outlined"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    style={{ paddingBottom: '30px', display: 'block' }}
                                /> : null}
                            </div>
                            <div >
                                <Button autoFocus onClick={handleClose} color="primary" >
                                    Cancel
                                </Button>
                                {title === 'Login' ? <Button color="primary" autoFocus type='submit'>
                                    Login
                                </Button> : <Button color="primary" autoFocus type='submit'>
                                    Sign Up
                                </Button>}
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}