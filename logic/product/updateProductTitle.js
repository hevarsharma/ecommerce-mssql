const appRoot = require('app-root-path')
const dbQuery = require(appRoot + "/helpers/dbQuery.json")
const dbrequest = require(appRoot + "/utils/dbrequest")
const format = require('pg-format')



const updateProductTitle = (prod_id, title) => {
    return new Promise(async (resolve, reject) => {
        try {

            let formattedquery = format(dbQuery.query.getProductById, prod_id);
            let product = await dbrequest(formattedquery).catch(err => reject(err))
            if (product.length > 0) {
                let formattedquery = format(dbQuery.query.updateProductTitle, title, prod_id);
                await dbrequest(formattedquery).catch(err => reject(err))
                resolve({ message: "product title updated" });
            }
            else{
                resolve({ message: "No product found" });
            }

        } catch (err) {
            reject(err.message)
        }
    })
}

module.exports = updateProductTitle