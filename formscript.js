function calcularLetraDNI(numeroDNI) {
    var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    var indice = numeroDNI % 23;
    return letras.charAt(indice);
}

function validarDNI(dni) {
    var numero = dni.substring(0, 8);
    var letra = dni.charAt(8).toUpperCase();
    var letraCalculada = calcularLetraDNI(numero);

    if (letra === letraCalculada) {
        return true;
    } else {
        return false;
    }
}

function validarTelefono(telefono) {
    // Expresión regular para validar el formato del número de teléfono español
    var telefonoRegex = /^[679]{1}[0-9]{8}$/;

    // Verificar si el número de teléfono coincide con el formato esperado
    if (telefonoRegex.test(telefono)) {
        return true;
    } else {
        return false;
    }
}

function enviarFormulario() {
    var dni = document.getElementById("dni").value;
    var nombre = document.getElementById("nombre").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;

    // Validación del DNI español
    var dniRegex = /^\d{8}[a-zA-Z]$/;
    if (!dniRegex.test(dni) || !validarDNI(dni)) {
        alert("El DNI no es válido.");
        return;
    }

    // Validación del correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("El correo electrónico no es válido.");
        return;
    }

    // Validación del telefono
    if (!validarTelefono(telefono)) {
        alert("El número de teléfono no es válido.");
        return;
    }

    // Si todas las validaciones son exitosas, puedes enviar el formulario
    // document.getElementById("userForm").submit();
    window.sessionStorage.setItem("dni", dni);
    window.sessionStorage.setItem("nombre", nombre)
    window.sessionStorage.setItem("telefono", telefono)
    window.sessionStorage.setItem("email", email)

}

function limpiarCampos() {
    document.getElementById("dni").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("email").value = "";
}

function cancelar() {
    // Puedes redirigir al usuario a otra página o mostrar un mensaje de confirmación, según tus necesidades
    alert("Operación cancelada");
}


