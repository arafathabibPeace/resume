import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Achievements from '../Achievements'
import PersonalDetails from '../PersonalDetails'
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


function DefaultPage() {
    const classes = useStyles();
    const [profileData, setProfileName] = useProfile()
    const [personalDetails, setPersonalDetails] = useState({})
    const [achievements, setAchievements] = useState({})


    const [path, setPath] = useState('')


    useEffect(() => {
        if (!path) {
            setPath(window.location.pathname)
        }
    }, [path])

    useEffect(() => {
        let pathname = path.split('/')
        if (pathname[1] === 'profile') {
            if (pathname[2]) {
                setProfileName(pathname[2])
            }
        }
    }, [path, profileData, setProfileName])

    useEffect(() => {
        if (profileData.person && profileData.picture && profileData.contacts && profileData.skills) {
            setPersonalDetails({ name: profileData.person, path: profileData.picture, contacts: profileData.contacts, skills: profileData.skills })
        }
        if (profileData.educations && profileData.employments && profileData.licensesOrCertificatesOrTrainings && profileData.characterReferences) {
            setAchievements({ educationalAttainment: profileData.educations, employments: profileData.employments, licensesOrCertificatesOrTrainings: profileData.licensesOrCertificatesOrTrainings, characterReferences: profileData.characterReferences })
        }
    }, [profileData])



    //console.log(profileData)
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={3}>
                    <div className={classes.divStyle}>
                        <PersonalDetails personalDetails={personalDetails} />
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