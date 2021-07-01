import React from 'react'
import Grid from '@material-ui/core/Grid';
import DefaultPage from './DefaultPage'

function Main() {

    return (
        <div>
            <Grid container style={{ border: '1px solid', minWidth: '1500px' }}>
                <Grid item xs={12} style={{ height: '60px', backgroundColor: '#DFE3EE' }}>

                </Grid>
                <Grid item xs={12} style={{ height: '20px', backgroundColor: '#3B5998' }}>

                </Grid>
                <Grid item xs={12} style={{ height: '609px' }}>
                    <DefaultPage />
                </Grid>
                <Grid item xs={12} style={{ height: '62px', backgroundColor: '#3B5998' }}>

                </Grid>
            </Grid>
        </div>
    );
}

export default Main;