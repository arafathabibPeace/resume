import React from 'react'
import Grid from '@material-ui/core/Grid';
import DefaultPage from './DefaultPage'
import ProtectedBody from './ProtectedBody';
import { ProtectedRoute } from './ProtectedRoute';
import Header from '../mainPages/Header';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

function Main() {

    return (
        <div>
            <Grid container style={{ border: '1px solid', minWidth: '1500px', backgroundColor: '#DFE3EE' }}>
                <Grid item xs={12} style={{ height: '60px', backgroundColor: '#DFE3EE' }}>
                    <Header />
                </Grid>
                <Grid item xs={12} style={{ height: '20px', backgroundColor: '#3B5998' }}>
                    Other Menu
                </Grid>
                <Grid item xs={12} style={{ height: '609px' }}>
                    <Router>
                        <Switch>
                            <Route exact path='/' component={() => { return <div>Home</div> }} />
                            <Route path='/profile' component={DefaultPage} />
                            <ProtectedRoute path={'/main'} component={ProtectedBody} >
                            </ProtectedRoute>
                        </Switch>
                    </Router>
                </Grid>
                <Grid item xs={12} style={{ height: '62px', backgroundColor: '#3B5998' }}>
                    Footer
                </Grid>
            </Grid>
        </div>
    );
}

export default Main;