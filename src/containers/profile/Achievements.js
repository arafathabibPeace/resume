import React from 'react'
import EducationalAttainment from '../profile/EducationalAttainment'
import EmploymentHistory from '../profile/EmploymentHistory'
import LicensesOrCertificatesOrTrainings from '../profile/LicensesOrCertificatesOrTrainings'
import CharacterReferences from '../profile/CharacterReferences'
import PropTypes from 'prop-types';
import { ThemeProvider as div } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Achievements(props) {

    const { achievements } = props
    const educationalAttainment = achievements.educationalAttainment
    const employmentHistory = achievements.employments
    const licensesOrCertificatesOrTrainings = achievements.licensesOrCertificatesOrTrainings
    const characterReferences = achievements.characterReferences
    const [value, setValue] = React.useState(0);
    const menu = ['Educational Attainment', 'Employment History', 'Trainings', 'Character Reference', 'Certificates', 'Projects']
    const content = [
        <EducationalAttainment educationalAttainment={educationalAttainment} />,
        <EmploymentHistory employments={employmentHistory} />,
        <LicensesOrCertificatesOrTrainings licensesOrCertificatesOrTrainings={licensesOrCertificatesOrTrainings} />,
        <CharacterReferences characterReferences={characterReferences} />
    ]

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style={{ backgroundColor: '#DFE3EE'}}>
                    {menu.map((label, index) => {
                        return <Tab key={index} label={label} {...a11yProps(index)} style={{ backgroundColor: '#3B5998' }} />//#3B5998
                    })}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {educationalAttainment ? content[0] : null}

            </TabPanel>
            <TabPanel value={value} index={1}>
                {employmentHistory ? content[1] : null}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {licensesOrCertificatesOrTrainings ? content[2] : null}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {characterReferences ? content[3] : null}
            </TabPanel>
            <TabPanel value={value} index={4}>
                soon...
            </TabPanel>
            <TabPanel value={value} index={5}>
                soon...
            </TabPanel>
        </div>




    );
}
Achievements.propTypes = {
    achievements: PropTypes.object
}

export default Achievements;