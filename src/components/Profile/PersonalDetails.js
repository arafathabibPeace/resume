import React from 'react';
import PropTypes from 'prop-types'

function PersonalDetails(props) {
    const{person} = props
    return (
        <div>
            {person.first_name} {person.middle_name} {person.last_name}
        </div>
    );
}

PersonalDetails.propTypes = {
    person: PropTypes.object
}

export default PersonalDetails;