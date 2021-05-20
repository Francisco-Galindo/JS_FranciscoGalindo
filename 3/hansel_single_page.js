// Actividad 3, pero usando sólo un HTML

let intervalo;
let fecha = new Date();
let pasosMax = 2;
let pasosDados = 0;

// Le da un valor y un tiempo de expiración a una cookie
function setCookie(name, value, expiringTime) {
    fecha.setTime(fecha.getTime() + (expiringTime));
    document.cookie = `${name}=${value}; expires=${fecha.toGMTString()}`;
}


// Regresa el valor de una cookie dada
function getCookie(name) {
    let cookies = document.cookie;
    let cookiesArr = cookies.split("; ");
    for (const valor of cookiesArr) {
        const cookie = valor.split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return "";
}

// Pide al usuario introducir un paso a cierta dirección
function askForStep() {
    let res;
    do {
        res = prompt("¿Hacia dónde quieres ir?").toUpperCase();
        if (res !== "IZQUIERDA" && res !== "DERECHA") {
            alert(`Necesito que escribas "izquierda" o "derecha"`);
        }
    } while (res !== "IZQUIERDA" && res !== "DERECHA");

    // Los pasos a la izquierda y derecha se guardan como ceros y unos en el historial
    histPasos += res === "IZQUIERDA" ? "0" : "1";
    setCookie("histPasos", histPasos, 1000 * 60 * 15)
    pasosDados ++;
}

// Pide un nuevo paso si no se han realizado los suficientes, muestra el destino si ya
function askForStepInterval() {
    if (histPasos.length < pasosMax) {
        askForStep();
    } else {
        clearInterval(intervalo);

        // Como el historial está representado con ceros y unos, puede ser interpretado
        // como binario, y convertido a un número en base 10 que represente el destino 
        // al que se llegó
        let destino = parseInt(histPasos, 2);


        let imgDestino = document.getElementById("imagen");
        let imagen;
        if (destino === 0) {
            imagen = "Casa.jpeg";
        } else if (destino === 1) {
            imagen = "Perdido_arbol.jpeg";
        } else if (destino === 2) {
            imagen = "Hongo_furioso.jpeg";
        } else if (destino === 3) {
            imagen = "Casa_bruja.jpeg";
        }

        imgDestino.setAttribute("src", `./statics/${imagen}`);

        let button = document.getElementById("button");
        button.style.display = "block";
    }
}

// Haciendo que el botón de reiniciar el camino limpie la cookie y recargue la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("button").addEventListener("click", function() {
        setCookie("histPasos", "", 1000 * 60 * 15)
        window.location.reload()
    }); 
});

let histPasos = getCookie("histPasos");
intervalo = setInterval(askForStepInterval, 1000);