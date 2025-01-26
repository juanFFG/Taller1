// constantes de numeros y botonoes
const numeros = document.querySelectorAll('.key');
const campoTexto = document.getElementById('clave');
const botonBorrar = document.getElementById('delete');
const botonEnter = document.getElementById('enter');

//arreglo para los numeros
const numerosOriginales = Array.from(numeros).map(button => button.textContent);

let ordenActual = [...numerosOriginales];

// Función para mezclar los números
function mezclarNumeros() {
    ordenActual = [...numerosOriginales];

    for (let i = ordenActual.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ordenActual[i], ordenActual[j]] = [ordenActual[j], ordenActual[i]];
    }

    // Actualizamos los botones con el nuevo orden
    numeros.forEach((button, index) => {
        button.textContent = ordenActual[index];
    });
}

// Evento para agregar el número al campo de texto
numeros.forEach(numero => {
    numero.addEventListener('click', function() {
        if (campoTexto.value.length < 6) {
            campoTexto.value += numero.id;
            mezclarNumeros();
        }
    });
});

// Función para cambiar todos los números a *
function cambiarANumeros() {
    numeros.forEach((button) => {
        button.textContent = '*';
    });
}

// Función para restaurar los números con el orden actual
function restaurarNumeros() {
    numeros.forEach((button, index) => {
        button.textContent = ordenActual[index];
    });
}

// Evento cuando el mouse entra al área del teclado
document.querySelector('.keyboard').addEventListener('mouseover', cambiarANumeros);

// Evento cuando el mouse sale del área del teclado
document.querySelector('.keyboard').addEventListener('mouseout', restaurarNumeros);

// Llamar a la función para mezclar cuando la página se cargue
window.onload = mezclarNumeros;

// Lógica para el botón de eliminar
botonBorrar.addEventListener('click', function() {
    if (campoTexto.value.length > 0) {
        campoTexto.value = campoTexto.value.slice(0, -1);
    }
});

// Lógica para el botón de enter
botonEnter.addEventListener('click', function() {
    if (campoTexto.value.length === 6) {
        alert('Clave correcta');
    } else {
        alert('Clave incorrecta');
    }
    console.log(campoTexto.value);
    campoTexto.value = '';
    mezclarNumeros();
});