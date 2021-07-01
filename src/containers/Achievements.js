import React, { useState, useEffect } from 'react'
import EducationalAttainment from './EducationalAttainment'
import EmploymentHistory from './EmploymentHistory'
import LicensesOrCertificatesOrTrainings from './LicensesOrCertificatesOrTrainings'
import CharacterReferences from './CharacterReferences'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

function Achievements(props) {

    const { achievements } = props
    const educationalAttainment = achievements.educationalAttainment
    const employmentHistory = achievements.employments
    const licensesOrCertificatesOrTrainings = achievements.licensesOrCertificatesOrTrainings
    const characterReferences = achievements.characterReferences
    const [selectedIndex, setSelectedIndex] = useState(0)
    const menu = ['Educational Attainment', 'Employment History', 'Trainings', 'Character Reference']
    const content = [
        <EducationalAttainment educationalAttainment={educationalAttainment} />,
        <EmploymentHistory employments={employmentHistory} />,
        <LicensesOrCertificatesOrTrainings licensesOrCertificatesOrTrainings={licensesOrCertificatesOrTrainings} />,
        <CharacterReferences characterReferences={characterReferences} />
    ]

    const handleChange = (event, index) => {
        setSelectedIndex(index)
    }

    return (
        <div><Grid>
            <Grid style={{ width: '900px' }}>
                {menu.map((item, index) => {
                    return <Link href="#" onClick={() => handleChange(item, index)} style={{ active: { color: 'blue' } }}>
                        <div style={{ display: 'inline-block', padding: '10px 20px 10px 20px'}}>
                            {item}
                        </div>
                    </Link>
                })}
            </Grid>
            <Grid style={{ width: '100%' }}>
                <div style={{ overflowY: 'auto' }}>
                    {(selectedIndex === 0 && educationalAttainment) ? content[0] : null}
                    {(selectedIndex === 1 && employmentHistory) ? content[1] : null}
                    {(selectedIndex === 2 && licensesOrCertificatesOrTrainings) ? content[2] : null}
                    {(selectedIndex === 3 && characterReferences) ? content[3] : null}
                </div>
            </Grid>
        </Grid>

        </div>
    );
}
Achievements.propTypes = {
    achievements: PropTypes.object
}

export default Achievements;