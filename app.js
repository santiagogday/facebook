const express = require('express');
const nodemailer = require('nodemailer')
const app = express();
const fs = require('fs')
const mongoose = require('mongoose');
const Usuario = require('./database')
app.use(express.json());

mongoose.connect('mongodb+srv://santiago:pancha@proyecto.jrimqlw.mongodb.net/usuarios?retryWrites=true&w=majority'
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))

app.post('/login-iniciar_sesion.html', async (req,res)=>{
    try{
        let datosRecibidos = req.body;
        let validacionEmail = await Usuario.findOne({ email: datosRecibidos.email });
        let validacionContraseña = await Usuario.findOne({ contraseña: datosRecibidos.contraseña });
        if (!validacionEmail || !validacionContraseña ){
            let dato = {mensaje: 'Error al iniciar sesion'}
            console.log(dato)
            res.json(dato)
        }
        else{
            let nuevoUsuario = new Usuario(datosRecibidos);
            await nuevoUsuario.save();
            let dato = {mensaje: 'Inicio de sesion exitoso'}
            console.log(dato)
            res.json(dato)
        }
    } 
    catch(e){
        console.log(e)
    }
})

app.post('/login-registrarse.html', async (req,res)=>{
    try{
        let datosRecibidos = req.body;
        let validacionEmail = await Usuario.findOne({ email: datosRecibidos.email });
        if (validacionEmail){
            let dato = {mensaje: 'Error al registrarse'}
            console.log(dato)
            res.json(dato)
        }
        else{
            let nuevoUsuario = new Usuario(datosRecibidos);
            await nuevoUsuario.save();
            let dato = {mensaje: 'Registro exitoso'}
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, 
                auth: {
                  user: "santiagogarciaday02@gmail.com",
                  pass: "klaf qkng qoyc usqo",
                },
            });
            transporter.verify().then(()=>console.log('Listo para enviar Email'))
            transporter.sendMail({
                from: "Santiago Garcia Day",
                to: (datosRecibidos.email),
                subject: "Jodete",
                text: `Tengo tu contraseña y es esta: ${datosRecibidos.contraseña}`
            })
            console.log(dato)
            res.json(dato)
        }
    } 
    catch(e){
        console.log(e)
    }
})

app.use(express.static('./'));

app.listen(3000, ()=>console.log('Escuchando en el puerto 3000'));