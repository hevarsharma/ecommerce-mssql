const appRoot = require('app-root-path')
const dbQuery = require(appRoot + "/helpers/dbQuery.json")
const dbrequest = require(appRoot + "/utils/dbrequest")
const format = require('pg-format')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = (user_mail, user_password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = format(dbQuery.query.getUserByMail, user_mail)
            let userRow = await dbrequest(query).catch(err => reject(err))

            if (userRow.length > 0) {

                comparePassword = await bcrypt.compare(user_password, userRow[0].user_password);
                let user_id = userRow[0].user_id;

                if (comparePassword) {
                    let payload = { user_id };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10h" });
                    //console.log(token);
                    resolve({
                        message: "login successfull",
                        token: token
                    })
                }
                else {
                    resolve({ mesage:  "Email and password does not match" });
                }
            }
            else {
                resolve({ mesage: "user is not exist" });
            }


        } catch (err) {
            reject(err.message)
        }
    })
}

module.exports = loginUser