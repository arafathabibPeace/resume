import React from 'react'
import Grid from '@material-ui/core/Grid';
import DefaultPage from './DefaultPage'

function Main() {

    return (
        <div>
            <Grid container style={{ border: '1px solid' }}>
                <Grid item xs={12} style={{ border: '1px solid green', height: '60px' }}>
                    Header
                    Banner
                </Grid>
                <Grid item xs={12} style={{ border: '1px solid green', height: '20px' }}>
                    Main Menu
                </Grid>
                <Grid item xs={12} style={{ border: '1px solid blue', height: '609px'}}>
                    <DefaultPage />
                </Grid>
                <Grid item xs={12} style={{ border: '1px solid blue', height:'62px' }}>
                    Footer
                </Grid>
            </Grid>
        </div>
    );
}

export default Main;