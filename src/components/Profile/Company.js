import React from 'react';
import PropTypes from 'prop-types'

function Company(props) {
    //console.log(props.company)
    const { company } = props
    return (
        <div>
            {company.map((item, index) => {
                return <div key={index}>{item.company_name}</div>
            })}
        </div>
    );
}

Company.propTypes = {
    company: PropTypes.array
}
export default Company;