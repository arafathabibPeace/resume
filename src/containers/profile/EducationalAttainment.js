import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Education from '../../components/profile/Education';
import PropTypes from 'prop-types'

function EducationalAttainment(props) {
    const { educationalAttainment } = props
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="left">Level</TableCell>
                        <TableCell align="left">Course</TableCell>
                        <TableCell align="left">School</TableCell>
                        <TableCell align="left">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {educationalAttainment.map((education, index) => {
                        return <Education education={education} key={index} />
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    );
}
EducationalAttainment.propTypes = {
    educationalAttainment: PropTypes.array
}

export default EducationalAttainment;