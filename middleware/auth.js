const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        try {

            let userId;

            const authHeader = req.headers['authorization']
            
            if (authHeader !== undefined) {

                const token = authHeader.split(' ')[1]

                if (token == null) {
                    return resolve(res.send({message: ".....unautherized from token side"}))
                }

                var decode = jwt.decode(token);
                userId = decode.id;

                jwt.verify(token, 'secret', (err, verifiedJwt) => {
                    if (err) {
                        return resolve(res.send({message: "unautherized"}))
                    } else {
                        //console.log(userId);
                        console.log('token verify');
                        //res.send( {token: token} )
                    }

                    req.userId = userId

                    next()
                })
            }
            else {
                console.log('token not verify');
                return resolve(res.send({message: "unautherized"}))
            }

        } catch (err) {
            reject(res.send({message: err.message}))
        }
    })
}
