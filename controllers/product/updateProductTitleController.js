const appRoot = require('app-root-path');
const { failureResponse, successResponse } = require(appRoot + '/utils/responseSchema')
const statusCodes = require(appRoot + '/utils/stausCodes.json')
const updateProductTitle = require('../../logic/product/updateProductTitle');

const updateProductTitleDb = async (req, res) => {
    try {

        const prod_id = req.params.prod_id;
        const title = req.body.title
        
        let product = await updateProductTitle(prod_id, title).catch(error => {
            let failure = failureResponse(statusCodes.BAD_REQUEST.status, error, statusCodes.BAD_REQUEST.statusCode)
            res.status(failure.statusCode).send(failure.body)
            
        })
        if (product) {
            let success = successResponse(product, statusCodes.OK.statusCode)
            res.status(success.statusCode).send(success.body)
        }
    } catch (error) {
        let failure = failureResponse(statusCodes.INTERNAL_SERVER_ERROR.status, error.message, statusCodes.INTERNAL_SERVER_ERROR.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }
}

module.exports = updateProductTitleDb