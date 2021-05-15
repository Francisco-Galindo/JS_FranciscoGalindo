espiral = [];

// Eligiendo el alto y ancho aleatoriaente
alto = Math.floor(Math.random()*10) + 1;
ancho = Math.floor(Math.random()*10) + 1;
console.log(`El alto es ${alto}, el ancho es ${ancho}`)

for (let i = 0; i < alto; i++) {
    espiral[i] = [];
    for (let j = 0; j < ancho; j++) {
        espiral[i].push(0);
    }
}


// Variables para conocer la posición en la que se calculará el término de la serie de fibonacci
let posX = 0;
let posY = 0;
// Para conocer la dirección en la cual se moverán las posiciones asignadas anteriormente
let deltaX = 1;
let deltaY = 0;


let contador = 1;

// Declarando las variables para conocer el término pasado y antepasado de la serie
let fibPrevPrev = 1;
let fibPrev = 0;
while (contador <= alto*ancho) {

    // Calculando el siguiente término de la serie y imprimiendolo cuando el contador es mayor a 1
    if (contador >  1) {
        let fibActual = fibPrev + fibPrevPrev;
        fibPrevPrev = fibPrev;
        fibPrev = fibActual;
        espiral[posY][posX] = fibActual;
    } else {
        espiral[posY][posX] = "0"; // XD
    }

    // Detenerse en el eje Y y moverse en el X, cuando Y está por fuera de la matriz, o el valor de la casilla no es el numero 0
    if (espiral[posY + deltaY] === undefined || (espiral[posY + deltaY][posX + deltaX] !== 0 && deltaX === 0)) {
        deltaY = 0
        if (espiral[posY + deltaY][posX + 1] === 0) {
            deltaX = 1;
        } else {
            deltaX = -1;
        }
    }
    // Detenerse en el eje Y y moverse en el X, cuando Y está por fuera de la matriz, o el valor de la casilla no es el numero 0
    else if (espiral[posY + deltaY][posX + deltaX] !== 0 && deltaY == 0) {
        deltaX = 0;
        if (espiral[posY + 1] !== undefined) {
            deltaY = 1;
            if (espiral[posY + deltaY][posX + deltaX] !== 0) {
                deltaY = -1;
            }
        } else {
            deltaY = -1;
        }
    }

    posX += deltaX;
    posY += deltaY;

    contador ++;
}

for (fila of espiral) {
    console.log(fila.toString());
}