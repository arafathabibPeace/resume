import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AccountService from '../services/AccountService'
import useAccount from '../hooks/UseAccount'

const useStyles = makeStyles({
    table: {
        minWidth: 100,
        width:300
    },
});

function Account() {
    const classes = useStyles();
    const [accounts] = useAccount([])
    
    return (

        <div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Account</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((userType) => (
                            <TableRow key={userType._id}>
                                <TableCell align="left">{userType.account_name}</TableCell>
                                <TableCell align="left">{userType.account_description}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Account;