import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import UseUser from '../hooks/UseUser'
import useAccount from '../hooks/UseAccount'
import { Redirect} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
}));

function Register(props) {
    const classes = useStyles()
    const [, , register] = UseUser()
    const [, accountId, getAccountId] = useAccount()
    const [accountName, setAccountName] = useState('Employee')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [helperText, setHelperText] = useState('')

    useEffect(() => {

        if ((password !== confirmPassword) || password === '' || confirmPassword === '') {
            setHelperText('Password not matched')
        } else {
            setHelperText('Password matched')
        }

    }, [password, confirmPassword])

    useEffect(() => {
        getAccountId(accountName)
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (helperText !== 'Password matched') {
            alert('Password not matched')
        }
        register({ email: email, password: password, foreign_id: accountId })
    }

    const signupForm = (
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel value="Employee" onChange={(e) => setAccountName(e.target.value)} control={<Radio color="primary" />} label="Employee" />
                    <FormControlLabel value="Employer" onChange={(e) => setAccountName(e.target.value)} control={<Radio color="primary" />} label="Employer" />
                </RadioGroup>
            </FormControl>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    variant="outlined"
                    onChange={e => setEmail(e.target.value)}
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
            <div>
                <TextField
                    id="outlined-password-input"
                    label="Confirm Password *"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={e => setConfirmPassword(e.target.value)}
                    helperText={helperText}
                />
            </div>
            <div className={classes.root}>
                <Button size="small" variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
            </div>
            <div style={{ padding: '20px' }}>
                Already registered? <Link href='/login' >Login</Link>
            </div>
        </form>

    )
    return (
        <div>
            {props.isAuth ? <Redirect to='/profile' /> : signupForm}

        </div>


    )

}


export default Register;