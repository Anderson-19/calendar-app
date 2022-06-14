const mogoose = require('mongoose');

const dbConnection = async () =>{
    try {
        await mogoose.connect( process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } );

        console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la DB');
    }

}

module.exports = {
    dbConnection
}