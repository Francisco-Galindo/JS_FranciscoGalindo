class Pokemon {
    constructor(nombre, naturaleza, tipo, stats = {vida:1, ataque:1, defensa:1, velocidad:1}, lvl = 1) {

        // Asignando los valores para todos los atributos de la clase
        this.nombre = nombre;
        this.naturaleza = naturaleza;
        this.tipo = tipo;

        this.stats = {};
        for (let key in stats) {
            this.stats[key] = stats[key] > 0 ? stats[key] : 1;
        }

        this.lvl = lvl > 0 ? lvl : 1;
    }

    // Sube el nivel del pokemon
    lvlUp() {
        this.lvl ++;
        console.log("Su pokémon ha subido de nivel, el nivel es: " + this.lvl);

        // Sube alguno de sus stats dependiendo de la naturaleza del pokemon
        switch (this.naturaleza) {
            case 'Audaz':
                this.stats["ataque"] ++;
                console.log("Tu nivel de ataque es: " + this.stats["ataque"]);
                break;
            case 'Osada':
                this.stats["defensa"] ++;
                console.log("Tu nivel de defensa es: " + this.stats["defensa"]);
                break;
            case 'Cauta':
                this.stats["vida"] ++;
                console.log("Tu nivel de vida es: " + this.stats["vida"]);
                break;
            case 'Alegre':
                this.stats["velocidad"] ++;
                console.log("Tu nivel de velocidad es: " + this.stats["velocidad"]);
                break;
            default:
                console.log("Esto es raro, tu pokémon tiene un naturaleza que no había visto antes, no sé que hacer")
        }
        if (this.lvl === 100) {
            console.log("Tu pokemon ha llegado al nivel 100");
        }
    }

    presentarse() {
        console.log(`Hola, me llamo ${this.nombre}, soy tipo ${this.tipo} y estoy al nivel ${this.lvl}`);
    }

    // Suma todos los stats del pokemon
    statsSum() {
        let sum = 0;
        for (let key in this.stats) {
            sum += this.stats[key];
        }

        console.log(`La suma de tus estadísticas es ${sum}`);
    }

    // Promedio de los stats de los pokemons
    statsAvg() {
        let sum = 0;
        let numValues = 0;
        for (let key in this.stats) {
            sum += this.stats[key];
            numValues ++;
        }
        if (numValues !== 0) {
            console.log(`El promedio de tus estadísticas es ${sum/numValues}`);
        }
    }
}

const charmander = new Pokemon("Charmander", "Audaz", "Fuego", {vida:15, ataque:20, defensa:15, velocidad:20}, 25);
const blastoise = new Pokemon("Blastoise", "Osada", "Agua", {vida:30, ataque:30, defensa:35, velocidad:30}, 97);
const butterfree = new Pokemon("Butterfree", "Cauta", "Bicho", {vida:20, ataque:15, defensa:15, velocidad:25}, 25);
const machoke = new Pokemon("Machoke", "Alegre", "Lucha", {vida:25, ataque:30, defensa:25, velocidad:15}, 39);
const mewtwo = new Pokemon("Mewtwo", "Audaz", "Psíquico", {vida:35, ataque:35, defensa:30, velocidad:40}, 120);