const config = require("../config/jwt.config");
const jwt = require('jsonwebtoken');
const accountModel = require("../models/account.model");
const { roles } = require("../config/roles");

//Include the permission system here
// exports.grantAccess = (action, resourse) => {
//     return async (req, res, next) => {
//         try {
//             const permission = roles.can(req.user.role)[action](resource);
//             if (!permission.granted) {
//                 return res.status(401).json({
//                     error: 'You dont have permission to perform this action'
//                 });
//             }
//             next();
//         } catch (error) {
//             next(error)
//         }
//     }
// }

// exports.allowIfLoggedIn = async (req, res, next) => {
//     try {
//         const user = res.locals.loggedInUser;
//         if (!user)
//             return res.status(401).json({
//                 error: "You need to be logged in to access this route"
//             });
//         req.user = user;
//         next();
//     } catch (error) {
//         next(error);
//     }
// }

exports.verifyUserToken = (req, res, next) => {

    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        token = token.split(' ')[1] // Remove Bearer from string
        console.log('Token: ', token)

        if (token === 'null' || !token) return res.status(401).send('Token-Unauthorized request');

        const verifiedUser = jwt.verify(token, config.TOKEN_SECRET);   // config.TOKEN_SECRET => 'secretKey'
        console.log('verifiedUser1:', verifiedUser)
        if (!verifiedUser) {
            return res.status(401).send('verifiedUser - Unauthorized request')
        }

        req.user = verifiedUser; // user_id & user_type_id
        next();

    } catch (error) {

        if (!config.REFRESH_TOKENS.includes(token)) {
            return res.status(400).send('Your session is expired')
        }
        const verifiedUser = jwt.verify(token, config.REFRESH_TOKEN_SECRET, { expiresIn: '10m' });
        req.user = verifiedUser; // user_id & user_type_id
        next();
    }

}
exports.IsUser = async (req, res, next) => {
    const account = await accountModel.findById(req.user.user_type_id);
    console.log(account.account_name);
    if (account.account_name !== 'Guest') {
        return res.status(401).send("IsUser - Unauthorized!");
    }
    next();

}
exports.IsAdmin = async (req, res, next) => {
    const account = await accountModel.findById(req.user.user_type_id);
    console.log(account.account_name);
    if (account.account_name !== 'Admin') {
        return res.status(401).send("IsAadmin - Unauthorized!");
    }
    next();

}