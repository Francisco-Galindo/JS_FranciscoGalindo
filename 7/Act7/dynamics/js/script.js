// Busca las carreras dependiendo del filtro puestos
function filtrar(value) {
    let peticion = $.ajax({
        url: "./dynamics/php/consultas.php",
        data: {dato: value},
        method: "POST"
    });
    peticion.done(function(response) {
        $(".results").html(response)
    });
    peticion.fail(() => {
        console.log("morido")
    });
}

$(document).ready(function() {

    filtrar(0);

    // Buscando por nombre de carrera
    $(".submitcarr").on("click", () => {
        let peticion = $.ajax({
            url: "./dynamics/php/consultas.php",
            data: {busq: $("#busqueda").val()},
            method: "POST"
        });
        peticion.done(function(response) {
            $(".results").html(response)
        });
        peticion.fail(() => {
            console.log("morido")
        });
      
    })    
    
    $(".filtmod").on("click", (event) => {
        let target = event.target
        if (target.index >= 0 && target.index <= 4) {
            filtrar(target.index)
        }
    })  
});