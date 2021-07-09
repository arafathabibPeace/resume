import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Employment from '../../components/profile/Employment';

function EmploymentHistory(props) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="left">Position</TableCell>
                        <TableCell align="left">Company</TableCell>
                        <TableCell align="left">Dates</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.employments.map((job, index) => {
                        return <Employment job={job} key={index} />
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default EmploymentHistory;