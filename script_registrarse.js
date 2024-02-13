const nombre = document.querySelector('.nombre');
const apellido = document.querySelector('.apellido');
const email = document.querySelector('.email');
const contraseña = document.querySelector('.contraseña');
const registrarse = document.querySelector('.registrarse');
const validacion = document.querySelector('.validacion');

registrarse.addEventListener('click', (e)=>{
    e.preventDefault();   
    let nombre_value = nombre.value;
    let apellido_value = apellido.value;
    let email_value = email.value;
    let contraseña_value = contraseña.value;
    let datos = {
    nombre: (nombre_value),
    apellido: (apellido_value),
    email: (email_value),
    contraseña: (contraseña_value) 
    }
    console.log(datos)
    fetch('/login-registrarse.html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        validacion.textContent = data.mensaje;
        if (data.mensaje == "Registro exitoso"){
            validacion.style.color = "green"
            registrarse.style.display = "none"
            nombre.value = ""
            apellido.value = ""
            email.value = ""
            contraseña.value = ""
        }
        else{
            validacion.style.color = "red"
            setTimeOut(function() {
                validacion.textContent = ""
            }, 3000)
        }
    })
    .catch(error => console.error('Error al obtener el dato:', error));
});