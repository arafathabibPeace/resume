const config = require("../config/jwt.config");
const jwt = require('jsonwebtoken');
const accountModel = require("../models/account.model");

//Include the permission system here


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
        const verifiedUser = jwt.verify(token, config.REFRESH_TOKEN_SECRET, { expiresIn: '10m' });

        console.log('verifiedUser2:', verifiedUser)
        if (!verifiedUser) {
            return res.status(400).send('Invalid Token')
        }
        //return res.status(400).send("Invalid Token",error);
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