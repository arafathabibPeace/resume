import React from 'react';
import PropTypes from 'prop-types'
function Contact(props) {
    const { contacts } = props
    return (
        <div>
            {contacts.map((contact,index)=>{
                return <div key={index}>{contact.contact_name} : {contact.contact_value}</div>
            })}
        </div>
    );
}
Contact.proptype = {
    contacts: PropTypes.array
}
export default Contact;