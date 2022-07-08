const createProduct = require('../../logic/product/createProduct')
const appRoot = require('app-root-path');
const { failureResponse, successResponse } = require(appRoot + '/utils/responseSchema')
const statusCodes = require(appRoot + '/utils/stausCodes.json');

const createProductDb = async (req, res) => {
    try {

        let title = req.body.title
        let price = req.body.price
        let description = req.body.description
        let category = req.body.category
        let image = req.body.image
        //let image = req.file//form-data is not saving file so we are passing sample string

        var currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 5);
        currentTime.setMinutes(currentTime.getMinutes() + 30);// Adding 5 hours and 30 minutes,

        let result = await createProduct(title, price, description, category, image, currentTime).catch(error => {
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
module.exports = createProductDb