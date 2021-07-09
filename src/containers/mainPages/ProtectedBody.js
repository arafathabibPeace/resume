import React, {useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ManageProfileMenu from '../ManageProfileMenu';
import { Route } from 'react-router-dom';
import Resume from '../../containers/Resume';
import PreferredJobs from '../../containers/PreferredJobs';
import PersonalInformation from '../../containers/PersonalInformation';
import EducationalAttainment from '../../containers/profile/EducationalAttainment';
import usePerson from '../../hooks/UsePerson';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));


function ProtectedBody(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [person, getPerson, errorMessage] = usePerson()
    const isLogged = sessionStorage.getItem('isAuth')
    const user = sessionStorage.getItem('userId')

    useEffect(() => {
        if (isLogged === null) {
            props.history.push('/')
        }
    }, [isLogged, props])

    const getPersonData = (user) => {
        getPerson(user)
    }

    return (
        // <div>
        //     <Grid container>
        //          <Grid item xs={2} style={{ border: 'solid orange' }}>
        //             <ManageProfileMenu />
        //         </Grid>
        //         <Grid item xs={10} style={{ border: 'solid red' }}>
        //             <Route exact path='/main/resume' ><Resume /></Route>
        //             <Route exact path='/main/preferred_jobs' ><PreferredJobs /></Route>
        //             <Route exact path='/main/personal_information'><PersonalInformation /></Route>
        //             <Route exact path='/main/educational_attainment'><EducationalAttainment /></Route>
        //         </Grid> 

        //     </Grid>

        // </div>
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
                <Tab label="Item Five" {...a11yProps(4)} />
                <Tab label="Item Six" {...a11yProps(5)} />
                <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
        </div>
    );
}

export default ProtectedBody;