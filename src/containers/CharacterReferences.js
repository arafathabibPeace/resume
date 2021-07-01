import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CharacterReference from '../components/Profile/CharacterReference';
import PropTypes from 'prop-types'

const useStyles = makeStyles({
    table: {
        width: '100%',
        border:'solid'
    },
});

function CharacterReferences(props) {
    const { characterReferences } = props
    const classes = useStyles();
    return (
        <TableContainer>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Job</TableCell>
                        <TableCell align="left">Company</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {characterReferences.map((person, index) => {
                        return <CharacterReference reference={person} key={index} />
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    );
}

CharacterReferences.propTypes = {
    characterReferences: PropTypes.array
}

export default CharacterReferences;