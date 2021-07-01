const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (account) => {
    ac.grant(account === 'employer')
        .readOwn('profile')
        .updateOwn('profile')
        .readAny('profile')
    ac.grant(account === 'jobseeker')
        .readOwn('profile')
        .updateOwn('profile')
    ac.grant(account === 'admin')
        .readOwn('profile')
        .updateOwn('profile')
        .deleteAny('profile')
    return ac
}


