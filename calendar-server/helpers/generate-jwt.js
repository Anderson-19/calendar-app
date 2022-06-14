const jwt = require('jsonwebtoken');

const User = require('../models/User')

const generateJWT = ( uid = '' ) =>{

    return new Promise ( (resolve, reject) =>{

        const payload = { uid };

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        }, ( err, token ) =>{

            if( err ){
                console.log(err);
                reject('unable to generate token')
            }else{
               resolve( token ); 
            }

        })

    })
}

const verifyJWT = async ( token = '' ) => {

    try {
        if( !token ) {
            return null;
        }

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        const user = await User.findById( uid );

        if ( user ) {
            if ( user.state ) {
                return user;
            } else {
                return false;
            }
        } else {
            return null;
        }
        
    } catch (error) {
        return null;
    }
    
}

module.exports = {
    generateJWT,
    verifyJWT
}