const bcrypt = require('bcryptjs');
const { request, response } = require('express');

const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/User');

const singIn = async ( req = request, res = response ) => {

    const { email, password } = req.body;

    try {
        let usuario = await User.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario ${ email } ya existe`
            });
        }

        usuario = new User( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        //const token = await generateJWT( usuario.id );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            //token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const logIn = async ( req = request, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await User.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario ${ email } no existe`
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generateJWT( usuario.id );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            lastname: usuario.lastname,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const revalidateToken = async (req, res = response ) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    singIn,
    logIn,
    revalidateToken
}