import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

function ManageProfileMenu(props) {
    const classes = useStyles();
    const menu = ['Resume', 'Preferred Jobs', 'Personal Information', 'Educational Attainment', 'Skills', 'Employment History', 'Trainings', 'Certificates', 'Awards/ Recognitions', 'Character References', 'Security']
    const hrefs = ['resume', 'preferred_jobs', 'personal_information', 'educational_attainment', 'skills', 'employment_history', 'trainings', 'certificates', 'awards_or_recognition', 'character_references', 'security']

    return (

        <Typography className={classes.root}>
            {menu.map((item, index) => {
                return <div><Link href={'/main/'+hrefs[index]}>{item}</Link></div>
            })}
        </Typography>

    );
}

export default ManageProfileMenu;