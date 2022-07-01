// *Developed by: Nicolás Cabera Rodríguez

const CANVAS = document.getElementById('canvas1'); // Obtener el canvas

const CTX = CANVAS.getContext('2d'); // Obtener el contexto del canvas

CANVAS.width = window.innerWidth; // Establecer el ancho del canvas

CANVAS.height = window.innerHeight; // Funcion para crear las particulas

let arrayParticulas = []; // Crear el array de particulas

let ajustarX = 6; // ajustar X

let ajustarY = 0; // ajustar Y

CTX.anchoLinea = 3; // establece el ancho de la linea


// *Colision con el raton
const MOUSE = {  
  x: null, // Posicion X del raton
  y: null, // Posicion Y del raton
  radius: 150 // Radio del raton
}

// *evento para detectar el movimiento del raton
window.addEventListener('mousemove', (event) => {

  MOUSE.x = event.x; // establece la posicion X del raton

  MOUSE.y = event.y; // establece la posicion Y del raton
});

// *estilo del texto
CTX.fillStyle = '#fff'; // establece el color del texto

CTX.font = '10px Arial'; // establece el tamaño del texto

CTX.fillText('HOLA!', 40, 15); // establece el texto

CTX.fillText('༼ つ ◕_◕ ༽つ', 0, 30); // establece el texto

const coordenadasTexto = CTX.getImageData(0, 0, 100, 100); // establece el texto

// *Clase Particula
class Particula {
  constructor(x, y) { // constructor

    this.x = x; // posicion en x

    this.y = y; // posicion en y

    this.size = 3; // tamaño de la particula

    this.baseX = this.x; // posicion en x base

    this.baseY = this.y; // posicion en y base

    this.densidad = (Math.random() * 8) + 1; // densidad de la particula

    this.distancia; // distancia de la particula
  }

  // *dibujar la particula
  draw() {
    CTX.fillStyle = 'rgba(255,255,255,0.8)'; // color de la particula

    CTX.strokeStyle = 'rgba(34,147,214,1)'; // color del borde

    CTX.beginPath(); // iniciar camino

    if(this.distancia < MOUSE.radius - 5) { // si la distancia es menor a la maxima

      this.size = 13; // tamaño de la particula

      CTX.arc(this.x, this.y, this.size, 0, Math.PI * 2); // dibujar particula

      CTX.stroke(); // dibujar borde

      CTX.closePath(); // cerrar camino

      CTX.beginPath(); // iniciar camino

      CTX.arc(this.x -3, this.y -3, this.size/2.5, 0, Math.PI * 2); // dibujar particula

      CTX.arc(this.x +7, this.y +1, this.size/3.5, 0, Math.PI * 2); // dibujar particula

    }else if(this.distancia <= MOUSE.radius){ // si la distancia es menor a la maxima

      this.size = 10; // tamaño de la particula

      CTX.arc(this.x, this.y, this.size, 0, Math.PI * 2); // dibujar particula

      CTX.stroke(); // dibujar borde

      CTX.closePath(); // cerrar camino

      CTX.beginPath(); // iniciar camino

      CTX.arc(this.x -2, this.y -2, this.size/3, 0, Math.PI * 2); // dibujar particula

    }else{ // Si no...

      this.size = 8; // tamaño de la particula

      CTX.arc(this.x, this.y, this.size, 0, Math.PI * 2); // dibujar particula

      CTX.stroke(); // dibujar borde

      CTX.closePath(); // cerrar camino

      CTX.beginPath(); // iniciar camino

      CTX.arc(this.x -1, this.y -1, this.size/3, 0, Math.PI * 2); // dibujar particula
    }

    CTX.closePath(); // cerrar camino

    CTX.fill(); // rellenar
  }

  // *actualizar la posicion de la particula
  update() {

    let dx = MOUSE.x - this.x; // distancia en x

    let dy = MOUSE.y - this.y; // distancia en y

    let distancia = Math.sqrt(dx * dx + dy * dy); // distancia total

    this.distancia = distancia; // guardar distancia

    let fuerzaDireccionX = dx / distancia; // fuerza en x

    let fuerzaDireccionY = dy / distancia; // fuerza en y

    let distanciaMaxima = MOUSE.radius; // distancia maxima

    let fuerza = (distanciaMaxima - distancia) / distanciaMaxima; // fuerza

    let direccionX = fuerzaDireccionX * fuerza * this.densidad; // direccion en x

    let direccionY = fuerzaDireccionY * fuerza * this.densidad; // direccion en y

    if (distancia < MOUSE.radius) { // si la distancia es menor a la maxima

      this.x -= direccionX; // actualizar posicion en x

      this.y -= direccionY; // actualizar posicion en y

    } else { // Si no...

      if (this.x !== this.baseX) { // si la posicion en x no es la base

        let dx = this.x - this.baseX; // distancia en x

        this.x -= dx / 10; // actualizar posicion en x

      }
      if (this.y !== this.baseY) { // si la posicion en y no es la base

        let dy = this.y - this.baseY; // distancia en y

        this.y -= dy / 10; // actualizar posicion en y

      }
    }
        
  }
}

// *Funcion para crear las particulas
function init() { 

  arrayParticulas = []; // Vaciar el array de particulas

  for (let y = 0, y2 = coordenadasTexto.height; y < y2; y++) { // Recorrer el alto del texto

    for (let x = 0, x2 = coordenadasTexto.width; x < x2; x++) { // Recorrer el ancho del texto

      if (coordenadasTexto.data[(y * 4 * coordenadasTexto.width) + (x * 4) + 3] > 128) { // Si el pixel es mayor que 128 (opacidad)

        let posicionX = x + ajustarX; // Posicion X de la particula

        let posicionY = y + ajustarY; // Posicion Y de la particula

        arrayParticulas.push(new Particula(posicionX * 20, posicionY * 20)); // Crear la particula

      }
    }
  }
}

init(); // *Iniciar la funcion init()

console.log(arrayParticulas); // Imprimir el array de particulas

// *Funcion para actualizar las particulas
function animate() {

  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); // Limpiar el canvas

  for (let i = 0; i < arrayParticulas.length; i++) { // Recorrer el array de particulas

    arrayParticulas[i].draw(); // Dibujar la particula

    arrayParticulas[i].update(); // Actualizar la posicion de la particula
  }
  // ? connect();
  requestAnimationFrame(animate); // Llamar a la funcion animate()
}

animate(); // TODO: Iniciar la animacion

// *Funcion para conectar las particulas
function connect() { 

  let valorOpacidad = 1; // valor de opacidad

  for (let i = 0; i < arrayParticulas.length; i++) { // recorre el array de particulas

    for (let j = i + 1; j < arrayParticulas.length; j++) { // recorre el array de particulas

      let dx = arrayParticulas[i].x - arrayParticulas[j].x; // calcula la distancia entre las particulas

      let dy = arrayParticulas[i].y - arrayParticulas[j].y; // calcula la distancia entre las particulas

      let distancia = Math.sqrt(dx * dx + dy * dy); // calcula la distancia entre las particulas

      valorOpacidad = 1 - (distancia / 50); // calcula la opacidad

      CTX.strokeStyle = `rgba(255,255,255,${valorOpacidad})`; // establece el color de la linea

      if (distancia < 50) { // si la distancia es menor a 50

        CTX.lineWidth = 2; // establece el ancho de la linea

        CTX.beginPath(); // inicia el camino

        CTX.moveTo(arrayParticulas[i].x, arrayParticulas[i].y); // mueve el camino a la posicion de la particula

        CTX.lineTo(arrayParticulas[j].x, arrayParticulas[j].y); // dibuja una linea hasta la posicion de la particula

        CTX.stroke(); // dibuja la linea
      }
    }
  }
}
