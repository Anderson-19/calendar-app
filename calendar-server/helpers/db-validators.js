const User = require('../models/User');
const Event = require('../models/Event');

const existsUserID = async ( id ) =>{
    const existsID = await User.findById( id );
    if( !existsID ){
        throw new Error(`the id: ${ id } not exists`);
    }
}

const existsEventID = async ( id ) =>{
    const existsID = await Event.findById( id );
    if( !existsID ){
        throw new Error(`the id: ${ id } not exists`);
    }
}

module.exports = {
    existsUserID,
    existsEventID
}