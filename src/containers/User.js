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
import UseUser from '../hooks/UseUser'
import useDialog from '../hooks/UseDialog'
import AddEditUserForm from './AddEditUserForm'


const useStyles = makeStyles({
    table: {
        minWidth: 250,
    },
});

function UsersPage() {
    const classes = useStyles()
    const [users, login, register, logout] = UseUser()
    const [user, setUser] = useState({})
    const [open, handleOpen, handleClose] = useDialog()
    const [dialogTitle, setDialogTitle] = useState('')
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    // const handleAddEditUser = (e, item) => {
    //     e.preventDefault()
    //     let title = ''

    //     if (item === undefined) {
    //         title = 'Add User'
    //         setUser({})
    //     } else {
    //         title = 'Edit User'
    //         setUser(item)
    //     }
    //     setDialogTitle(title)
    //     handleOpen()
    // }
    return (
        <div>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">
                                        
                                        </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <div>
                <div>
                    <Button variant="outlined" color="primary">Add User</Button>
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