import React from 'react';
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import License from '../../components/profile/License';
import Date from '../../components/profile/Date';
import Company from '../../components/profile/Company';


function LicensesOrCertificatesOrTrainings(props) {
    const {licensesOrCertificatesOrTrainings} = props
    return (
        <div>
            <TableContainer component={Paper}>
                <Table  aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>License</TableCell>
                            <TableCell>Date Acquired</TableCell>
                            <TableCell>Organizer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {licensesOrCertificatesOrTrainings.map((item, index) => {
                            return (
                                < TableRow key={index}>
                                    <TableCell><License license={item.licenseCertificateTraining} /></TableCell>
                                    <TableCell><Date date={item.date_acquired} /></TableCell>
                                    <TableCell><Company company={item.company} /></TableCell>
                                </TableRow>)
                        })}

                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    );
}

LicensesOrCertificatesOrTrainings.propTypes={
    licensesOrCertificatesOrTrainings:PropTypes.array
}
export default LicensesOrCertificatesOrTrainings;