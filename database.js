const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    contraseña: String
});

const usuarios = mongoose.model("usuarios", usuariosSchema);
module.exports = usuarios;