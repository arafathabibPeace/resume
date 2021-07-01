import React from 'react';
import PropTypes from 'prop-types'
import Rating from '@material-ui/lab/Rating';

const myStyle = { display: 'inline-block' }
function Skill(props) {
    const {skills} = props
    return (
        <div>
            {skills.map((skill, index) => {
                return (
                    <div key={index}>
                        <div style={myStyle}>{skill.skill_name}</div>
                        <div style={myStyle}><Rating name="disabled" value={skill.skill_rate} size="small" disabled /></div>
                    </div>
                )
            })}
        </div>
    );
}

Skill.propTypes = {
    skills: PropTypes.array
}

export default Skill;