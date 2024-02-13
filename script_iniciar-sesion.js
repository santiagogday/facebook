const email = document.querySelector('.email');
const contraseña = document.querySelector('.contraseña');
const registrarse = document.querySelector('.registrarse');
const validacion = document.querySelector('.validacion')

registrarse.addEventListener('click', (e)=>{
    e.preventDefault();
    let email_value = email.value;
    let contraseña_value = contraseña.value;
    let datos = {
        email: (email_value),
        contraseña: (contraseña_value)
    }
    fetch('/login-iniciar_sesion.html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        validacion.textContent = data.mensaje;
        if (data.mensaje == "Inicio de sesion exitoso"){
            validacion.style.color = "green"
        }
        else{
            validacion.style.color = "red"
        }
    })
    .catch(error => console.error('Error al obtener el dato:', error));

});