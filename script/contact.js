window.onload = function() {
    // Verificar si hay datos en sessionStorage
    var storedNombre = window.sessionStorage.getItem("nombre");
    var storedEmail = window.sessionStorage.getItem("email");
    var storedMessage = window.sessionStorage.getItem("mensaje");

    // Llenar campos del formulario si hay datos en sessionStorage
    if (storedNombre && storedEmail && storedMessage) {
        document.getElementById("nombre").value = storedNombre;
        document.getElementById("email").value = storedEmail;
        document.getElementById("message").value = storedMessage;
    }
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}
