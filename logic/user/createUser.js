const appRoot = require('app-root-path')
const dbQuery = require(appRoot+"/helpers/dbQuery.json")
const dbrequest = require(appRoot+"/utils/dbrequest")
const format = require('pg-format')
const bcrypt = require('bcryptjs');

const createUser = (user_name, user_mail, user_password, createdOn) => {         
    return new Promise(async (resolve, reject) => {
        try {
                let query = format(dbQuery.query.getmail,user_mail)
                let emailExist = await dbrequest(query).catch(err => reject(err))
                if(emailExist.length>0){
                    resolve({
                        message:"Email already exist"
                    })
                }
                else{
                    let salt = await bcrypt.genSalt(10);
                    let encryptedPassword = await bcrypt.hash(user_password, salt);

                    let formattedquery = format(dbQuery.query.createUser, user_name, user_mail,encryptedPassword,createdOn)
                    await dbrequest(formattedquery).catch(err => reject(err))

                    resolve({
                        "user_name":user_name,
                        "user_mail":user_mail,
                        "user_password":encryptedPassword,
                        "createdOn": createdOn
                    })
            
                }
                
            
        } catch (err) {
            reject(err.message)
        }
    })
}

module.exports = createUser