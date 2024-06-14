/* Generamos una instancia de socket.io desde el lado del cliente */

const socket = io();

socket.emit("Mensaje","Hola mundo! Te escribo desde cliente");

socket.on("Saludo", (data) => {
    console.log(data);
})


// Recibimos el array de usuarios del server
socket.on("Usuarios", (data) => {
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = "";

    data.forEach(usuario => {
        listaUsuarios.innerHTML += `<li> ${usuario.nombre} - ${usuario.apellido}</li>`
    })
})