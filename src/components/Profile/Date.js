import React from 'react';
import PropTypes from 'prop-types'

function Date(props) {
    const { date } = props

    const arrangeDates = (date) => {
        let firstDate = ''
        let secondDate = ''
        for (let i = 0; i < date.length; i++) {
            if (date[1]) {
                secondDate = ' to ' + date[1].date
            }
            firstDate = date[0].date
        }
        return <div>{firstDate + secondDate}</div>
    }

    return (
        <div>
            {arrangeDates(date)}
        </div>
    );
}
Date.propTypes = {
    date: PropTypes.array
}

export default Date;