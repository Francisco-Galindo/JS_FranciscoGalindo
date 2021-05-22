let colores = ["red", "green", "blue", "yellow"];
let cuadrosColores = [];
let pasosObjetivo = [];
let colorcitosDelBro = [];
let i;
let intervalo;

function resultadosJuego(victoria) {

	document.getElementById("pista").style.display = "none";

	if (victoria === true) {
		document.getElementById("ganador").style.display = "block";
		document.getElementById("foto-minino").style.display = "block";
	} else {
		document.getElementById("perdedor").style.display = "block";
	}
}

function validarPaso(utlimoPaso) {
	// Si el ultimo paso dado no coincide con el paso que debe dar, pierdaa
	if (colorcitosDelBro[utlimoPaso] !== pasosObjetivo[utlimoPaso]) {
		return resultadosJuego(false);
	}
	
  // Gana si ya dio todos los pasos
	if (utlimoPaso + 1 >= pasosObjetivo.length) {
		return resultadosJuego(true);
	}
}

//Añadimos los cuadros que eliga el usuario
function darPaso(idCuadroPaso) {
	colorcitosDelBro.push(idCuadroPaso);
	validarPaso(colorcitosDelBro.length - 1);
}

// Activa los cuadritos para que puedan ser clickeados
function empezarCicloPasos() {
	for (cuadro of cuadrosColores) {
		cuadro.classList.add("clickeable");
		
		cuadro.addEventListener("click", (event) => {
			let idCuadroPaso = event.target.id;
			darPaso(idCuadroPaso);
		});
	}

}

function iluminarCuadro() {
	setTimeout(() => {
		if (i < 5) {
			let num = Math.round(Math.random() * 3);
			cuadrosColores[num].classList.add("brillante");
			// Añadiendo el cuadrito a los pasos que se deben dar
			pasosObjetivo.push(cuadrosColores[num].id);
			i++;	
					
		} else {
			clearInterval(intervalo);
			empezarCicloPasos();
		}
	}, 250);
}

function generarPasos() {
	let promesa = new Promise((resolve) => {	
		// Para que no persista el brillo de los cuadritos después de que hayan sido iluminados
		for (cuadro of cuadrosColores) {
			cuadro.classList.remove("brillante");
		}
		resolve();

	}).then(() => {
		iluminarCuadro();
	})
}


document.addEventListener('DOMContentLoaded', () => {
	// Guardando todos los cuadritos de colores en un arreglo que se usará para poder modificar sus propiedades después
	for (let colorcito of colores) {
		cuadrosColores.push(document.getElementById(colorcito));
	}
    
	let btnInicio = document.getElementById("btn-inicio");

	btnInicio.addEventListener("click", () => {
		btnInicio.style.display = "none";

		i = 0;
		intervalo = setInterval(() => {
			generarPasos();
		}, 750)
	})
})