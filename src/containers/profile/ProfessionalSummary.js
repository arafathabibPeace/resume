import React from 'react';
import PropTypes from 'prop-types'
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import Contact from '../../components/profile/Contact'
import Skill from '../../components/profile/Skill';
import PersonalDetails from '../../components/profile/PersonalDetails';

function ProfessionalSummary(props) {
    const { data } = props
    let person = data.person
    let picture = data.picture
    let contacts = data.contacts
    let skills = data.skills

    return (
        <div style={{ alignCntent: 'center' }}>

            <div style={{ alignCntent: 'center', paddingTop: '3  0px' }}>
                {picture ? <ProfileAvatar picture={picture} /> : null}
            </div>
            <div><h3>
                {person ? <PersonalDetails person={person} /> : null}
            </h3></div>
            <div>
                {contacts ? <Contact contacts={contacts} /> : null}
            </div>
            <div><h4>Total years of job experience: 7</h4></div>
            <div><h3>Skills</h3>
                {skills ? <Skill skills={skills} /> : null}
            </div>
        </div>
    );
}
ProfessionalSummary.propTypes = {
    data: PropTypes.object,
}
export default ProfessionalSummary;