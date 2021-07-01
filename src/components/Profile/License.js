import React from 'react';
import PropTypes from 'prop-types'

function License(props) {

  const { license } = props
  return (
    <div>
      {license.award_name}
    </div>
  );
}
License.propTypes = {
  license: PropTypes.object
}

export default License;