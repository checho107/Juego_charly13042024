(function() {
    document.getElementById('txtNombre').focus();
})();

let index = 0;
let correctas = [];
let preguntas = [];
let alternativas = [];
let rptas = [];
const tiempo = 10;
let countdownfunction;

function validarNombre() {
   let nombre = document.getElementById('txtNombre').value;
   let correo = document.getElementById('txtCorreo').value;

   if (nombre.length === 0) {
       alert('Por favor ingresa tu nombre');
       document.getElementById('txtNombre').focus();
   } else if (correo.length === 0) {
       alert('Por favor ingresa tu correo electrónico');
       document.getElementById('txtCorreo').focus();
   } else {
       bienvenida(nombre);
   }
}

function bienvenida(nombre) {

   mostrarDiv('categoria');

   let mensaje = `¡Bienvenida ${nombre}!`;
   document.getElementById('msgHola').innerHTML = mensaje;

}

function cargarPreguntasTipo(tipo) {
   
   let titulo = '';
   reiniciar();

   if(tipo === 'A') {
       preguntas = [
           "1.- ¿Sabes cuantas carreras hay en la universidad?",
           "2.- ¿Que te gustaria estudiar?",
           "3.- ¿Te gustaria estudiar a distancia o virtual?"
       ];

       alternativas = [
           [" 1 a 2 carreras"," 3 a 4 carreras","5 carreras"],
           ["sistemas","Contabilidad","administración"],
           ["distancia","virtual"]
       ];
       

       rptas = [
           2,
           1,
           1
       ];

       titulo = 'INFORMACIÓN';

   } else if(tipo === 'B') {
       preguntas = [
           "1.- ¿Cuanto dura una carrera universitaria?",
           "2.- ¿Cuantos creditos hay en una carrera?",
           "3.- ¿cuantos profesores hay?"
       ];

       alternativas = [
           ["1 a 2 años","3 a 5 años","6 años"],
           ["160","100","180"],
           ["5","10","7"]
       ];

       rptas = [
           1,
           0,
           2
       ];

       titulo = 'GEOGRAFÍA';

   }

   document.getElementById('msgCategoria').innerHTML = titulo;
   mostrarDiv('jugar');
   cargarPreguntas(index);

}

function siguiente() {
   document.getElementById('divrpta').style.display = 'none';
   index++;
   clearInterval(countdownfunction);
   if(index <= preguntas.length-1) {  
       cargarPreguntas(index);
   }
   
   if(index === preguntas.length) {  
       verResultados();
   }

}

function cargarPreguntas(indice) {
   
       document.getElementById('pregunta').innerHTML = preguntas[indice];
       let opciones = "";
       for(let j=0; j<alternativas[indice].length; j++) {
           opciones += "<p>";
           opciones += "<label class='lblopc'><input type='radio' class='radios' onclick='checkRpta("+j+")' name='opc' >"+ alternativas[indice][j] +"</label> ";
           opciones += "</p>";
       }
       
       document.getElementById('alternativas').innerHTML = opciones;
       
       iniciarTimer();

}

function iniciarTimer() {
   let trestante = tiempo;
   document.getElementById('timer').innerHTML = trestante;
   countdownfunction = setInterval(function() {
       trestante--;

       if(trestante === 0) {
           document.getElementById("timer").innerHTML = "X";
       } else if(trestante < 0) {
           trestante = tiempo;
           siguiente();
       } else {
           document.getElementById('timer').innerHTML = trestante;
       }
       console.log(trestante);


   },1000);

   
}

function checkRpta(rpta) {
   
   document.getElementById('divrpta').style.display = 'block';
   let mensaje = "RESPUESTA INCORRECTA :(";
   let color='red';
   

   if(rptas[index] === rpta) {
       mensaje = "RESPUESTA CORRECTA :)";
       correctas.push(index);
       color='green';
   }
   document.getElementById('divrpta').style.background =color;
   document.getElementById('divrpta').innerHTML = mensaje;
   deshabilitarRadios('radios');

}

function verResultados() {
   mostrarDiv('resultados');
   let template = '';

   //preguntas=["1)-","2)-","3)-"] --> (i)
   for(let i = 0; i < preguntas.length; i++) {
       let estado = 'INCORRECTO';
       let classEstado = 'incorrecto';

       //correctas=[1,2] -->indice de preguntas(x)
       for(let x of correctas) {
           if(x === i) {
               estado = 'CORRECTO';
               classEstado = 'correcto';
               break;
           }
       }

       template += '<p>';
       template += '<h3>'+preguntas[i]+' <label style="color: ' + (classEstado === 'correcto' ? 'green' : 'red') + '">'+estado+'</label></h3>';
       template += '</p>';
   }

   document.getElementById('divresultado').innerHTML = template;
}

function mostrarDiv(div) {
   let ocultos = document.getElementsByClassName('box');
   for(var i=0, len=ocultos.length; i<len; i++) {
       ocultos[i].style.display = 'none'
   }
   document.getElementById(div).style.display = 'block';
}

function deshabilitarRadios(radios) {
   let rds = document.getElementsByClassName(radios);
   for(var i=0, len=rds.length; i<len; i++) {
       rds[i].disabled = true;
   }
}

function reiniciar() {
   index = 0;
   correctas = [];
   preguntas = [];
   alternativas = [];
   rptas = [];
}

function cerrarSesion(){
   window.location.reload();
}

function exportarResultados() {
   // Obtener el contenido del div resultados
   let resultadosDiv = document.getElementById('resultados');
   
   // Crear un elemento div para contener el contenido con estilos
   let contentDiv = document.createElement('div');
   contentDiv.style.fontFamily = 'Arial, sans-serif';
   contentDiv.style.padding = '20px';
   contentDiv.style.borderRadius = '10px';
   contentDiv.style.margin = 'auto'; // Centrar el contenido horizontalmente
   contentDiv.style.maxWidth = '800px'; // Establecer un ancho máximo para el contenido
   contentDiv.style.textAlign = 'center'; // Centrar el contenido dentro del div
   
   // Agregar estilos al fondo
   contentDiv.style.backgroundImage = 'url("https://i.pinimg.com/564x/e3/82/22/e382228a94ff5b30d56bef977cc23f59.jpg")'; // Cambiar la ruta de la imagen de fondo
   contentDiv.style.backgroundSize = 'cover'; // Ajustar el tamaño de la imagen de fondo
   contentDiv.style.backgroundPosition = 'center'; // Centrar la imagen de fondo
   contentDiv.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.1)'; // Agregar sombra al contenedor
   contentDiv.style.border = '2px solid #ccc'; // Añadir un borde alrededor del contenedor

   // Agregar el contenido del logo
   let logoImg = document.createElement('img');
   logoImg.src = 'https://yt3.ggpht.com/ytc/AIdro_nCgXmbWtPr-gEw1DhAvc57MSqwRZtQTnqXkWE0=s800-c-k-c0x00ffffff-no-rj'; // Cambiar la ruta por la del logo
   logoImg.style.border= '1px solid black';
   logoImg.style.width = '100px'; // Ajustar el tamaño del logo según sea necesario
   logoImg.style.marginBottom = '20px'; // Agregar margen inferior al logo
   
   // Agregar el logo al contenido
   contentDiv.appendChild(logoImg);

   // Clonar el contenido del div resultados
   let resultadosClone = resultadosDiv.cloneNode(true);

   // Eliminar los botones del clon
   let buttons = resultadosClone.querySelectorAll('button');
   buttons.forEach(button => button.remove());
   contentDiv.appendChild(resultadosClone);

   // Establecer estilos al título RESULTADOS
   let tituloResultados = contentDiv.querySelector('h2');
   tituloResultados.style.color = '#72A0C1'; // Cambiar el color del título a blanco

   // Crear un Blob con el contenido HTML
   let blob = new Blob([contentDiv.outerHTML], { type: 'text/html' });

   // Crear un enlace de descarga
   let a = document.createElement('a');
   a.href = URL.createObjectURL(blob);
   a.download = 'resultados_trivia.html';
   a.click();
}








