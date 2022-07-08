const appRoot = require('app-root-path')
const dbQuery = require(appRoot+"/helpers/dbQuery.json")
const dbrequest = require(appRoot+"/utils/dbrequest")
const format = require('pg-format')



const getForms = () => {         
    return new Promise(async (resolve, reject) => {
        try {
                let formattedquery = format(dbQuery.query.getUsers);
                let users = await dbrequest(formattedquery).catch(err => reject(err))
                if(users){
                    resolve(users)
                }
                else {
                    reject("No user found")
                }
        } catch (err) {
            reject(err.message)
        }
    })
}

module.exports = getForms