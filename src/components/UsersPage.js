import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useFetchUsers from '../hooks/UseFetchUser'
import useDialog from '../hooks/UseDialog'
import AddEditUserForm from './AddEditUserForm'


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function UsersPage() {
    const classes = useStyles()
    const [users, addUser, editUser, deleteUser] = useFetchUsers()
    const [user, setUser] = useState({})
    const [open, handleOpen, handleClose] = useDialog()
    const [dialogTitle, setDialogTitle] = useState('')
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleAddEditUser = (e, item) => {
        e.preventDefault()
        console.log(item.length)
        let title = ''

        if (item === undefined) {
            title = 'Add User'
            setUser({})
        } else {
            title = 'Edit User'
            setUser(item)
        }
        setDialogTitle(title)
        handleOpen()
    }
    return (
        <div>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Account Type</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Modify</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell component="th" scope="row" align="center">
                                        {user.account_type}
                                    </TableCell>
                                    <TableCell align="center">{user.first_name + ' ' + user.last_name}</TableCell>
                                    <TableCell align="center">{user.phone}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" onClick={e => handleAddEditUser(e, user)}>Edit User</Button>
                                        <Button variant="outlined" color="primary" onClick={()=>deleteUser(user._id)}>Delete User</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <div>
                <div>
                    <Button variant="outlined" color="primary" onClick={e => handleAddEditUser(e)}>Add User</Button>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <AddEditUserForm user={user} save={addUser} close={handleClose} />
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

        </div>
    );
}

export default UsersPage;