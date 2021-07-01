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
import Date from './Date'
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Education(props) {
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const { education } = props;

    const educationLevel = education.education.education_level
    const school = education.school_details.school_name
    const schoolContact = education.school_details.school_contact
    const course = education.course.course_name
    const major = education.course.course_major
    const schoolYear = education.school_year
    const awards = education.awards

    //console.log('Level: ', educationLevel, '\nSchool: ', school, '\nSchool Contact: ', schoolContact, '\nCourse: ', course, '\nMajor: ', major, '\nSchool Year: ', schoolYear, '\nAwards: ', awards)

    return (
        < React.Fragment >
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{educationLevel}</TableCell>
                <TableCell>{course}<div style={{ fontSize: '12px', color: 'green' }}>{major}</div></TableCell>
                <TableCell>{school}</TableCell>
                <TableCell><Date date={schoolYear} /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Awards
                            </Typography>

                            {awards.map((award, index) => {
                                return <div key={index}>
                                    <div>{award.award.award_name}</div>
                                    {award.date_awarded.map((date, index) => {
                                        return <div key={index}>{date.date_name} : {date.date}</div>
                                    })}
                                </div>
                            })}

                        </Box>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                School Contact
                            </Typography>
                            {schoolContact.map((contact, index) => {
                                return <div key={index}>{contact.contact_name} : {contact.contact_value}</div>
                            })}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >

    );
}
Education.propTypes={
    education:PropTypes.object
}
export default Education;