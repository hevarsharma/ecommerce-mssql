const appRoot = require('app-root-path');
const { failureResponse, successResponse } = require(appRoot + '/utils/responseSchema')
const statusCodes = require(appRoot + '/utils/stausCodes.json')
const deleteProduct = require('../../logic/product/deleteProduct');

const deleteProductdb = async (req, res) => {
    try {

        const prod_id = req.params.prod_id;
        
        let product = await deleteProduct(prod_id).catch(error => {
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

module.exports = deleteProductdb