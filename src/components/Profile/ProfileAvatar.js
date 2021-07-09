import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline',
        '& > *': {
            margin: theme.spacing(1),
        },

    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        alignContent: 'center',
        border: '3px solid white',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    typography: {
        fontSize: '.7rem',
    }
}));

function ProfileAvatar(props) {
    const classes = useStyles();

    const { picture } = props

    const setPath = (path) => {

        const newPath = path.split('\\')
        const src = 'http://localhost:4000/' + newPath[0] + '/' + newPath[1]
        return src

    }
    return (
        <div className={classes.root}>
            <Avatar alt="Remy Sharp" src={setPath(picture.picture_path)} className={classes.large} />
        </div>

    );
}
ProfileAvatar.propType = {
    picture: PropTypes.object
}
export default ProfileAvatar;