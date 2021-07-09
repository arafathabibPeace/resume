import React, { } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Login'
import ProtectedHeader from './ProtectedHeader';
import { ProtectedRoute } from './ProtectedRoute';

function Header(props) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <ProtectedRoute exact path='/main*' component={ProtectedHeader} />
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default Header;