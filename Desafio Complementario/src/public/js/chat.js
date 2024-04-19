// Creamos una instancia de Socket.io desde el Front

const socket = io();

// Creamos una variable para guardar el usuario.
let user;
const chatBox = document.getElementById("chatBox");

// Utilizamos Sweetalert para el mensaje de bienvenida
// Swal es un objeto global que nos permite usar los métodos de la librería
// Fire es un método que nos permite configurar la alerta

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresá un usuario para identificarte en el chat",
    inputValidator: (value) => {
            return !value && "Necesitás escribir un nombre para continuar";
    },
    allowOutsideClick: false,

}).then( result  => {
    user = result.value;
})

chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0) {
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value="";
        }
    }
})

// Listener de mensajes
socket.on("messagesLogs", (data) => {
    const log = document.getElementById("messagesLogs");
    let messages = "";
    data.forEach( message => {
        messages = messages + `${message.user} dice: ${message.message} <br>`;
    })
    log.innerHTML = messages;
})