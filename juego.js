const contexto = document.getElementById("lienzoJuego");
const ctx = contexto.getContext("2d");

let WIDTH = 300;
let HEIGHT = 530;

let CANVAS_WIDTH = 300;
let CANVAS_HEIGHT = 530;

contexto.width = WIDTH;
contexto.height = HEIGHT;

// Variables Globales
const FPS = 60;
const gravedad = 1.5;
let score = 0

const personaje = {
    x: 50,
    y: 150,
    width: 50,
    height:50,
}

const tuberias = new Array();
tuberias[0] = {
    x: contexto.width,
    y:0,
}

// Variables Audios 
const punto  = new Audio();
punto.src = "audios/punto.mp3";


// Variables Imagenes
const bird = new Image();
bird.src = "imagenes/bird.png";

const background = new Image();
background.src = "imagenes/background.png";

const suelo = new Image();
suelo.src = "imagenes/suelo.png";

const tuberiaNorte = new Image();
tuberiaNorte.src = "imagenes/tuberiaNorte.png";

const tuberiaSur = new Image();
tuberiaSur.src = "imagenes/tuberiaSur.png";

 

// control
function presionar(){
    personaje.y -= 40
}
resize()
function resize(){
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;

    contexto.width = WIDTH;
    contexto.height = HEIGHT;

    contexto.style.height = ""+ CANVAS_HEIGHT+"px";

}


// bucle
const loop = () =>{
    ctx.clearRect(0,0,contexto.width,contexto.height);
    // Fondo
    ctx.drawImage(background,0,0);
    ctx.drawImage(suelo,0,contexto.height - suelo.height);
     
    // Personaje
    ctx.drawImage(bird, personaje.x, personaje.y)

    // Tuberias
    for(let i = 0; i< tuberias.length; i++){
        let constante = tuberiaNorte.height + 100;
        ctx.drawImage(tuberiaNorte,tuberias[i].x,tuberias[i].y);
        ctx.drawImage(tuberiaSur,tuberias[i].x,tuberias[i].y + constante);
        tuberias[i].x--

        if(tuberias[i].y + tuberiaNorte.height < 80){
            tuberias[i].y = 0
        }

        if(tuberias[i].x == 150){
            tuberias.push({
                x:contexto.width,
                y: Math.floor(Math.random() * tuberiaNorte.height) - tuberiaNorte.height
            })
        }

        // Colisiones
        if(personaje.x + bird.width >= tuberias[i].x && 
            personaje.x <= tuberias[i].x + tuberiaNorte.width &&
            (personaje.y <= tuberias[i].y +tuberiaNorte.height ||
                personaje.y + bird.height >= tuberias[i].y + constante) ||
                personaje.y + bird.height >= contexto.height - suelo.height){
                    window.location.reload();
                }
    
        if(tuberias[i].x == personaje.x){
            score++;
            punto.play()
        }

    }

    // gravedad
    personaje.y += gravedad

    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.font = "23px Arial";
    ctx.fillText("Score: "+score, 10, contexto.height-40)
}

setInterval(loop,1000/FPS)

window.addEventListener("resize",resize);
window.addEventListener("click",presionar);