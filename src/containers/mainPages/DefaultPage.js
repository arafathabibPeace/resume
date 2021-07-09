import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Achievements from '../profile/Achievements'
import ProfessionalSummary from '../profile/ProfessionalSummary'
import useProfile from '../../hooks/UseProfile';

export const PersonContext = React.createContext()
export const AchievementContext = React.createContext()

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(0),
            flexGrow: 1,
        },
    },
    divStyle: {
        height: '609px', minHeight: '609px'
    }
}));


function DefaultPage(props) {
    const classes = useStyles();
    const [profileData, setProfileName] = useProfile()
    const [summary, setSummary] = useState({})
    const [achievements, setAchievements] = useState({})
    const path = props.location.pathname

    useEffect(() => {
        if (profileData.picture !== undefined) {
            setSummary({ person: profileData.person, picture: profileData.picture, contacts: profileData.contacts, skills: profileData.skills })
            setAchievements({ educationalAttainment: profileData.educations, employments: profileData.employments, licensesOrCertificatesOrTrainings: profileData.licensesOrCertificatesOrTrainings, characterReferences: profileData.characterReferences })
        }
    }, [profileData, setSummary, setAchievements])
    
    useEffect(() => {
        if (Object.entries(profileData).length === 0) {
            const pathname = path.split('/')
            if (pathname[2]) {

                setProfileName(pathname[2])
            }
        }

    }, [setProfileName, path, profileData])

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={3} style={{ backgroundColor: '#DFE3EE' }}>
                    <div className={classes.divStyle}>
                        <ProfessionalSummary data={summary} />

                    </div>
                </Grid>
                <Grid item xs={9}  >
                    <div className={classes.divStyle}>
                        <Achievements achievements={achievements} />
                    </div>

                </Grid>
            </Grid>

        </div>

    )
}

export default DefaultPage;