import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        alignContent: 'center',
        border: '3px solid #3B5998',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

function ProfileAvatar(props) {
    const classes = useStyles();
    const { path } = props

    const setPath = (path) => {

        const newPath = path.split('\\')
        const src = 'http://localhost:4000/' + newPath[0] + '/' + newPath[1]
        return src

    }
    return (
        <div className={classes.root}>
            <Avatar alt="Remy Sharp" src={setPath(path)} className={classes.large} />
        </div>
    );
}
ProfileAvatar.propType = {
    path: PropTypes.string
}
export default ProfileAvatar;