// -----------variables globales----------------
const intervalos = {};
let progresivo = false;
let temporizadores = [];
/*let actualizarTiempoRestante = () => {}; // Variable funcion

// -----------Variables para crear tabla-----------------
var tabla = document.createElement("table"); // Crea una tabla
var fila1 = document.createElement("tr"); // Se añaden celda1, celda2 y sumar/restar minutos
var celda1 = document.createElement("td"); // Va el nombre de cada persona
var celda2 = document.createElement("td"); // Va el tiempo de cada persona
// ------------ 4 días en segundos -------------
var tiempoRestante = 4 * 24 * 60 * 60; */

function mostrarDiv() {
  var div = document.getElementById("miDiv");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

function onScanSuccess(qrCodeMessage) {

    llenarArray(qrCodeMessage);
  }

function onScanError(_errorMessage) {
  //mensaje de error
}
var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);


let miArray = [];
function llenarArray(elemento){
  if (miArray.includes(elemento) == true){
    miArray.push();
  }else{
    miArray.push(elemento);
    crearTabla(elemento);
  }
  
}
/*function crearTabla(elemento) {//chatgpt cambia individualmente
  const nombre = elemento;
  const tabla = document.createElement("table");
  const fila1 = document.createElement("tr");
  const celda1 = document.createElement("td");
  const celda2 = document.createElement("td");
  let tiempoRestante = 4 * 24 * 60 * 60; // 4 días en segundos
  let temporizador = tiempoRestante;
  let esProgresivo = false;
  
  var actualizarTiempoRestante = () => {
    if (esProgresivo) {
      celda2.innerHTML = convertirSegundosATiempo(temporizador);
      temporizador++;
    } else {
      celda2.innerHTML = convertirSegundosATiempo(temporizador);
      temporizador--;
    }
  };
  
  var intervalo = setInterval(() => {
    actualizarTiempoRestante();
  }, 1000);

  const sumarMinutos = () => {
    if (esProgresivo) {
      temporizador -= Number(prompt("¿Cuántos minutos quieres restar?")) * 60;
    } else {
      temporizador += Number(prompt("¿Cuántos minutos quieres sumar?")) * 60;
    }
    actualizarTiempoRestante();
  };
  
  const restarMinutos = () => {
    if (esProgresivo) {
      temporizador += Number(prompt("¿Cuántos minutos quieres sumar?")) * 60;
    } else {
      temporizador -= Number(prompt("¿Cuántos minutos quieres restar?")) * 60;
    }
    actualizarTiempoRestante();
  };
  
  const botonSumar = document.createElement("button");
  botonSumar.innerText = "+";
  botonSumar.onclick = sumarMinutos;
  
  const botonRestar = document.createElement("button");
  botonRestar.innerText = "-";
  botonRestar.onclick = restarMinutos;
  
  const botonDetener = document.createElement("button");
  botonDetener.innerText = "Detener";
  botonDetener.onclick = () => clearInterval(intervalo);

  const botonCambiar = document.createElement("button");
  botonCambiar.innerText = "Cambiar";
  botonCambiar.onclick = () => {
    const codigo = prompt("Introduce el código:");
    if (codigo === "1234") {
      esProgresivo = !esProgresivo;
    }
  };

  celda2.setAttribute("id", "celda2");
  celda1.innerText = nombre;
  actualizarTiempoRestante();
  fila1.appendChild(celda1);
  fila1.appendChild(celda2);
  tabla.appendChild(fila1);
  tabla.appendChild(botonSumar);
  tabla.appendChild(botonRestar);
  tabla.appendChild(botonDetener);
  tabla.appendChild(botonCambiar);
  document.getElementById("tabla").appendChild(tabla);
}*/

function crearTabla(elemento) {//original
  const nombre = elemento;
  const tabla = document.createElement("table");
  const fila1 = document.createElement("tr");
  const celda1 = document.createElement("td"); // Nombre de cada persona
  const celda2 = document.createElement("td"); // Temporizador
  const celda3 = document.createElement("td"); // Sumar o restar minutos
  const tiempoRestante = 4 * 24 * 60 * 60; // 4 días en segundos
  let temporizador = tiempoRestante;
   var actualizarTiempoRestante = () => {
    if (progresivo) {
      celda2.innerHTML = convertirSegundosATiempo(tiempoRestante - temporizador);
    } else {
      celda2.innerHTML = convertirSegundosATiempo(temporizador);
    }
  };
    var intervalo = setInterval(() => {
    temporizador--;
    actualizarTiempoRestante();
  }, 1000);
  const sumarMinutos = () => {
    Swal.fire({
      title: '¿Cuántos minutos quieres sumar?',
      input: 'number',
      inputAttributes: {
        min: 1,
        step: 1
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        temporizador += result.value * 60;
        actualizarTiempoRestante();
      }
    });
  };
  const restarMinutos = () => {
    Swal.fire({
      title: '¿Cuántos minutos quieres restar?',
      input: 'number',
      inputAttributes: {
        min: 1,
        step: 1
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        temporizador -= result.value * 60;
        actualizarTiempoRestante();
      }
    });
  };
  celda2.setAttribute("id", "celda2");
  celda1.innerText = nombre;
  actualizarTiempoRestante();
  fila1.appendChild(celda1);
  fila1.appendChild(celda2);
  fila1.appendChild(celda3);
  tabla.appendChild(fila1);
  document.getElementById("tabla").appendChild(tabla);
  const botonSumar = document.createElement("button");
  botonSumar.innerText = "+";
  botonSumar.onclick = sumarMinutos;
  celda3.appendChild(botonSumar);
  botonSumar.setAttribute("id", "button_tabla")
  const botonRestar = document.createElement("button");
  botonRestar.innerText = "-";
  botonRestar.onclick = restarMinutos;
  celda3.appendChild(botonRestar);
  botonRestar.setAttribute("id", "button_tabla")

  intervalos[nombre] = intervalo;
  temporizadores.push({ nombre, temporizador, intervalo });
}

function convertirSegundosATiempo(segundos) {
  const dias = Math.floor(segundos / (24 * 60 * 60));
  segundos -= dias * 24 * 60 * 60;
  const horas = Math.floor(segundos / (60 * 60));
  segundos -= horas * 60 * 60;
  const minutos = Math.floor(segundos / 60);
  segundos -= minutos * 60;
  return `${dias} : ${horas} : ${minutos} : ${segundos}`;
}

function convertirTiempoADiasHorasMinutosSegundos(dias, horas, minutos, segundos) {
  let totalSegundos = dias * 24 * 60 * 60 + horas * 60 * 60 + minutos * 60 + segundos;
  const diasResultado = Math.floor(totalSegundos / (24 * 60 * 60));
  totalSegundos -= diasResultado * 24 * 60 * 60;
  const horasResultado = Math.floor(totalSegundos / (60 * 60));
  totalSegundos -= horasResultado * 60 * 60;
  const minutosResultado = Math.floor(totalSegundos / 60);
  totalSegundos -= minutosResultado * 60;
  const segundosResultado = totalSegundos;
  return `${diasResultado} : ${horasResultado} : ${minutosResultado} : ${segundosResultado}`;
}


function sweetAlertPideCodigo() {
  Swal.fire({
    title: 'Ingrese el código',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      const codigo = result.value;
      cambiarTemporizadores(codigo);
    }
  });
  
}
function cambiarTemporizadores(codigo) {
  if (codigo == "1234") {
    Swal.fire({
      title: 'Código correcto',
      text: 'Temporizadores en cuenta progressiva',
      icon: 'success',
      backdrop: `
        rgba(0,0,123,0.4)
        url("./img/nyan-cat.gif")
        left top
        no-repeat
      `
    });
    const celdasTemporizador = document.querySelectorAll("#tabla td:nth-child(2)");
    celdasTemporizador.forEach((celdaTemporizador) => {
      clearInterval(intervalos[celdaTemporizador.parentElement.firstChild.textContent]);
      const tiempoRestante = 0;
      let temporizador = tiempoRestante;
      var actualizarTiempoRestante = () => {
        celdaTemporizador.innerHTML = convertirSegundosATiempo(temporizador);
      };
      var intervalo = setInterval(() => {
        temporizador++;
        actualizarTiempoRestante();
      }, 1000);
      celdaTemporizador.tiempoRestante = tiempoRestante;
      celdaTemporizador.intervalo = intervalo;
    });
    progresivo = true;
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Código incorrecto',
    })
  }
}






/*
function cambiarTemporizadores() {
  const codigo = prompt("Introduce el código:");
  if (codigo === "1234") {
    const celdasTemporizador = document.querySelectorAll("#tabla td:nth-child(2)");
    for (let i = 0; i < celdasTemporizador.length; i++) {
      const celdaTemporizador = celdasTemporizador[i];
      clearInterval(intervalos[celdaTemporizador.parentElement.firstChild.textContent]);
      const tiempoRestante = 0;
      let temporizador = tiempoRestante;
      var actualizarTiempoRestante = () => {
        celdaTemporizador.innerHTML = convertirSegundosATiempo(temporizador);
      };
      var intervalo = setInterval(() => {
        temporizador++;
        actualizarTiempoRestante();
      }, 1000);
      celdaTemporizador.tiempoRestante = tiempoRestante;
      celdaTemporizador.intervalo = intervalo;
    }
    progresivo = true;
  }
}

/*
function cambiarTemporizadores() {
  const codigo = prompt("Introduce el código:");
  if (codigo === "1234") {
    progresivo = !progresivo;
    const temporizadores = document.getElementsByClassName("temporizador");
    for (let i = 0; i < temporizadores.length; i++) {
      const temporizador = temporizadores[i];
      clearInterval(temporizador.intervalo);
      if (progresivo) {
        temporizador.tiempoRestante = -1;
        temporizador.intervalo = setInterval(() => {
          temporizador.tiempoRestante++;
          temporizador.innerHTML = convertirTiempoADiasHorasMinutosSegundos(0,0,0,0);
        }, 1000);
      } else {
        temporizador.tiempoRestante = 4 * 24 * 60 * 60; // 4 días en segundos
        temporizador.intervalo = setInterval(() => {
          temporizador.tiempoRestante--;
          temporizador.innerHTML = convertirSegundosATiempo(temporizador.tiempoRestante);
        }, 1000);
      }
    }
  }
}*/








