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
import Skill from './Skill'
import Date from './Date'
import Contact from './Contact'

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Employment(props) {

    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const { job } = props;
    const position = job.position.job.job_name
    const jobDescription = job.position.job.job_description
    const skills = job.position.skills
    const company = job.employer.company.company_name
    const companyContact = job.employer.company.contacts
    const date = job.dates

    return (
        < React.Fragment >
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{position}</TableCell>
                <TableCell>{company}</TableCell>
                <TableCell><Date date={date} /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Job Description
                            </Typography>
                            {jobDescription}

                        </Box>
                        <Box margin={1}>
                            <Typography gutterBottom component="div">
                                Requirements
                            </Typography>
                            <Skill skills={skills} />
                        </Box>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Company Contact Details
                            </Typography>
                            <Contact contacts={companyContact}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}
Employment.propTypes={
    job:PropTypes.object
}
export default Employment;