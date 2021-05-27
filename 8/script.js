// Muestra o no la opción para el segundo color
function mostrarSegundoColor(event) {

    let labelDegradado = document.getElementById("degradado");
    if (event.target.value !== "solido" && labelDegradado.innerHTML.indexOf("input") === -1) {
        document.getElementById("degradado").innerHTML = 
        "Color de degradado  <input type='color' id='color2'>"

    } else if (event.target.value === "solido") {
        labelDegradado.innerHTML = "";
    }
}

document.addEventListener('DOMContentLoaded', () => {

    let inputTipo = document.getElementById("tipo-fondo");
    inputTipo.addEventListener("click", mostrarSegundoColor)

    let canvas = document.getElementById("dibujo");


    canvas.addEventListener("click", () => {
        let ctx = canvas.getContext("2d");
        let tam = canvas.height;

        let figura = document.getElementById("figura").value;
        let color1 = document.getElementById("color1").value;

        // El segundo color es el mimsmo que el primero en caso de que no se haya llenado el segundo
        let color2 = color1;
        if (document.getElementById("color2") !== null) {
            color2 = document.getElementById("color2").value
        }

        // El degradado se asigna como radial si así se ha especificado, linear si no
        let degradado;
        if (document.getElementById("tipo-fondo").value === "radial") {
            degradado = ctx.createRadialGradient(tam/2,tam/2, 50, tam/2, tam/2, tam/2);
        } else {
            degradado = ctx.createLinearGradient(0,0, 0, tam);
        }

        degradado.addColorStop(0, color1);
        degradado.addColorStop(1, color2);
        ctx.fillStyle = degradado;

        ctx.clearRect(0,0,tam,tam)


        if (figura === 'estrella') {

            // Puede dibujar una estrella con la cantidad de picos que se quiera (sólo a partir de 5 se ve bien)
            ctx.translate(tam/2, tam/2);
            let ladosEstrella = 5;
            ctx.beginPath();
            for (let i  = 0; i < ladosEstrella; i++) {
                ctx.moveTo(tam/(1.5*ladosEstrella), -tam/(1.5*ladosEstrella));
    
                ctx.lineTo(0, -tam/2)
                ctx.lineTo(-tam/(1.5*ladosEstrella), -tam/(1.5*ladosEstrella))
                ctx.lineTo(0,0);

                ctx.rotate( (Math.PI * 2) / ladosEstrella)
            }
        
            ctx.closePath();
            ctx.translate(-tam/2, -tam/2);
            ctx.fill();


        } else if (figura === 'raton'){
            ctx.translate(tam/2, tam/2);
            ctx.beginPath();
                ctx.arc(0, 0, 200, 0, Math.PI * 2)
                ctx.arc(-100* Math.sqrt(2), -100* Math.sqrt(2), 100, 0, Math.PI * 2)  
        
            ctx.closePath();
            ctx.translate(-tam/2, -tam/2);
            ctx.fill();
        
            ctx.translate(tam/2, tam/2);
            ctx.beginPath();
                ctx.arc(100* Math.sqrt(2), -100* Math.sqrt(2), 100, Math.PI * 2, 0)
        
        
            ctx.closePath();
            ctx.translate(-tam/2, -tam/2);
            ctx.fill();
            
        
        
        } else {
            let unidad = (tam - 4)/34; // Medida horizontal en unidades de esta curva de Fibonacci
            ctx.translate(2, 6.5*unidad);

            // Dibujando rectangulos
            ctx.beginPath();
                moveTo(0,0);
                ctx.lineWidth = 4;
                ctx.rect(0,0, 21*unidad, 21*unidad)
                ctx.rect(21*unidad, 0, 13*unidad, 13*unidad)
                ctx.rect(26*unidad, 13*unidad, 8*unidad, 8*unidad)
                ctx.rect(21*unidad, 16*unidad, 5*unidad, 5*unidad)
                ctx.rect(21*unidad, 13*unidad, 3*unidad, 3*unidad)
                ctx.rect(24*unidad, 13*unidad, 2*unidad, 2*unidad)
                ctx.rect(24*unidad, 15*unidad, unidad, unidad)
                ctx.rect(25*unidad, 15*unidad, unidad, unidad)
        
                ctx.fill();
                ctx.stroke();
             
            ctx.closePath();
        
            // Dibuujando curvas
            ctx.beginPath();
        
                moveTo(0, 21*unidad);
                ctx.arc(21*unidad, 21*unidad, 21*unidad, Math.PI, Math.PI * 1.5)
                ctx.arc(21*unidad, 13*unidad, 13*unidad, Math.PI * 1.5, 0)
                ctx.arc(26*unidad, 13*unidad, 8*unidad, 0, Math.PI * 0.5)
                ctx.arc(26*unidad, 16*unidad, 5*unidad, Math.PI * 0.5, Math.PI)
                ctx.arc(24*unidad, 16*unidad, 3*unidad, Math.PI, Math.PI * 1.5)
                ctx.arc(24*unidad, 15*unidad, 2*unidad, Math.PI * 1.5, 0)
                ctx.arc(25*unidad, 15*unidad, unidad, 0, Math.PI)
        
                ctx.stroke();
             
            ctx.closePath();
            ctx.translate(-2, -6.5*unidad);
        }
    })
});