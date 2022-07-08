const appRoot = require('app-root-path')
const dbQuery = require(appRoot + "/helpers/dbQuery.json")
const dbrequest = require(appRoot + "/utils/dbrequest")
const format = require('pg-format')

const createProduct = (title, price, description, category, image, currentTime) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!image) {
                console.log(image);
                return resolve({ message: 'image file not found.' }) 
            }

            //const imageUrl = image.path;//form-data is not coming
            const imageUrl = image

            let formattedquery = format(dbQuery.query.createProduct, title, price, description, category, imageUrl, currentTime)
            await dbrequest(formattedquery).catch(err => reject(err))

            resolve({
                "title": title,
                "price": price,
                "description": description,
                "category": category,
                "imageUrl": imageUrl,
                "cretedOn": currentTime
            })

        } catch (err) {
            reject(err.message)
        }
    })
}

module.exports = createProduct