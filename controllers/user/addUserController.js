const createUser = require('../../logic/user/createUser')
const appRoot = require('app-root-path');
const { failureResponse, successResponse } = require(appRoot + '/utils/responseSchema')
const statusCodes = require(appRoot + '/utils/stausCodes.json');

const createUserDb = async (req, res) => {
    try {
        let user_name = req.body.user_name
        let user_mail = req.body.user_mail
        let user_password = req.body.user_password

        var currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 5);
        currentTime.setMinutes(currentTime.getMinutes() + 30);// Adding 5 hours and 30 minutes,

        let result = await createUser(user_name, user_mail, user_password, currentTime).catch(error => {
            let failure = failureResponse(statusCodes.BAD_REQUEST.status, error, statusCodes.BAD_REQUEST.statusCode)
            res.status(failure.statusCode).send(failure.body)
        })
        if (result) {
            let success = successResponse(result, statusCodes.OK.statusCode)
            res.status(success.statusCode).send(success.body)
        }

    } catch (error) {
        let failure = failureResponse(statusCodes.INTERNAL_SERVER_ERROR.status, error.message, statusCodes.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }
}
module.exports = createUserDb