import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Contact from './Contact';
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function CharacterReference(props) {
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const { reference } = props

    const person = reference.person.first_name + ' ' + reference.person.middlename + ' ' + reference.person.last_name
    const job = reference.job.job_name
    const company = reference.employer.company_name
    const contacts = reference.contact

    return (
        < React.Fragment >
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{person}</TableCell>
                <TableCell>{job}</TableCell>
                <TableCell>{company}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Contact Details
                            </Typography>
                            <Contact contacts={contacts} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >

    );
}

CharacterReference.propTypes = {
    reference: PropTypes.object
}

export default CharacterReference;