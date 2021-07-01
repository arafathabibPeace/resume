import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function AddEditUserForm(props) {
    console.log(props)
    const user = props.user
    const classes = useStyles();
    const [account_type, setAccount_type] = useState(user.account_type)
    const [first_name,setFirst_name] = useState(user.first_name)
    const [last_name, setLast_name]=useState(user.last_name)
    const [phone,setPhone]=useState(user.phone)
    const [email,setEmail]=useState(user.Email)
    const [username,setUsername]=useState(user.username)
    const [password,setPassword]=useState(user.password)


    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <div><TextField required id="standard-required" label="Account Type" defaultValue={user.account_type} onChange={e => setAccount_type(e.target.value)} /></div>
                    <div><TextField required id="standard-required" label="Firstname" defaultValue={user.first_name} onChange={e=>setFirst_name(e.target.value)}/></div>
                    <div><TextField required id="standard-required" label="Lastname" defaultValue={user.last_name} onChange={e=>setLast_name(e.target.value)}/></div>
                    <div><TextField required id="standard-required" label="Phone Number" defaultValue={user.phone} onChange={e=>setPhone(e.target.value)}/></div>
                    <div><TextField required id="standard-required" label="Email" defaultValue={user.email} onChange={e=>setEmail(e.target.value)}/></div>
                    <div><TextField required id="standard-required" label="Username" defaultValue={user.username} onChange={e=>setUsername(e.target.value)}/></div>
                    <div><TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        defaultValue={user.password}
                        onChange={e=>setPassword(e.target.value)}
                    /></div>
                    <Button autoFocus onClick={props.close} color="primary">Close</Button>
                    <Button onClick={props.save} color="primary" autoFocus>Save</Button>

                </div>
            </form>
        </div>
    );
}

export default AddEditUserForm;