const socket = io();
const nameInput = document.getElementById("nombre");

function sendMessage() {

    if(!nameInput.value) {
        return alert("Debe ingresar un nombre");
    }

    nameInput.disabled = true;
    const message = {
        nombre: nameInput.value,
        text: document.getElementById("mensaje").value
    };
    
    socket.emit("incomingMessage", message);
    document.getElementById("mensaje").value = "";
    document.getElementById("mensaje").focus();
}


socket.on("chat", messages => {
    const texto = messages.map( mensaje => {
        return(`<div>
        <strong style="color: #${mensaje.color}">${mensaje.nombre}</strong>:
        <em>${mensaje.text}</em>
        </div>`);
    }).join(" ");

    document.getElementById("messages").innerHTML = texto;
});

socket.on("usersList", users => {
    // const liUser = Object.values(users).map( user => {
    //     return(`
    //     <li class="m-1 border-bottom" id=${user}>
    //         <strong>${user}</strong>
    //     </li>`);
    // }).join(" ");

    const liUser = Object.keys(users.users).map( user => {
        return(`
        <li class="m-1 border-bottom" id=${users.users[user]}>
            <strong style="color: #${users.colors[user]}">${users.users[user]}</strong>
        </li>`);
    }).join(" ");

    document.getElementById("users-list").innerHTML = liUser;
});

socket.on("changeName", () => {
    nameInput.disabled = false;
    return alert("Esta utilizando un nombre no disponible, por favor cambielo");
});