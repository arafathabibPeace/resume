import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import ProfileAvatar from '../components/Profile/ProfileAvatar';
import Contact from '../components/Profile/Contact'
import Skill from '../components/Profile/Skill';

function PersonalDetails(props) {
    let { personalDetails } = props
    const name = personalDetails.name
    const path = personalDetails.path
    const contacts = personalDetails.contacts
    const skills = personalDetails.skills

    return (
        <div style={{ alignCntent: 'center' }}>

            <div style={{ alignCntent: 'center' }}>
                {path ? <ProfileAvatar path={path} /> : null}
            </div>
            <div style={{padding:'10px'}}><h3>{name ? name.first_name + ' ' + name.middle_name + ' ' + name.last_name : null}</h3></div>
            <div style={{padding:'5px'}}>
                {contacts ? <Contact contacts={contacts} /> : null}
            </div>
            <div><h4>Total years of job experience: 7</h4></div>
            <div style={{padding:'5px'}}><h3>Skills</h3>
                {skills ? <Skill skills={skills} /> : null}
            </div>

        </div>


    );
}
PersonalDetails.propTypes = {
    personalDetails: PropTypes.object
}
export default PersonalDetails;