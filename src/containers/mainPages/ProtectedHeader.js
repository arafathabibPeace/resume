import React from 'react';
import Logout from '../Logout';

function ProtectedHeader(props) {

    return (
        <div>
            <Logout/>
        </div>
    );
}

export default ProtectedHeader;