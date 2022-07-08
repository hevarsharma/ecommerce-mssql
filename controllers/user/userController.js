const appRoot = require('app-root-path');
const { failureResponse, successResponse } = require(appRoot + '/utils/responseSchema')
const statusCodes = require(appRoot + '/utils/stausCodes.json')
const getUsers = require('../../logic/user/getUsers');

const getForms = async (req, res) => {
    try {
        
        let forms = await getUsers().catch(error => {
            let failure = failureResponse(statusCodes.BAD_REQUEST.status, error, statusCodes.BAD_REQUEST.statusCode)
            res.status(failure.statusCode).send(failure.body)
            
        })
        if (forms) {
            let success = successResponse(forms, statusCodes.OK.statusCode)
            res.status(success.statusCode).send(success.body)
        }
    } catch (error) {
        let failure = failureResponse(statusCodes.INTERNAL_SERVER_ERROR.status, error.message, statusCodes.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }
}

module.exports = getForms