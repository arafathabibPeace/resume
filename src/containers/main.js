import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const usestyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    div_body_content: {
        height: '650px',
    },
}));

function main(props) {
    const classes = usestyles();
    return (

        <div className={classes.root}>
            <Grid>
                <Grid spacing={3}
                    container>

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>Header</Paper>
                    </Grid>
                </Grid>
                <Grid spacing={1}
                    container
                    alignItems="stretch"
                >
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>
                            <div className={classes.div_body_content}>
                                <div>Dashboard</div>
                                <div>Security</div>
                                <div>Skills</div>
                            </div></Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <div className={classes.div_body_content}>Body Content</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>
                            <div className={classes.div_body_content}>Advertisements</div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid spacing={3}
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch">
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>Footer</Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>

    );
}

export default main;