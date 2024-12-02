let slideIndex = 1;
showSlides(slideIndex); //slideIndex en 1 para representar la primera diapositiva

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n); //muestra la diapositiva con el índice n
}

//Define una función llamada showSlides que toma un argumento n que representa el índice de la diapositiva que se mostrará
function showSlides(n) { 
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1; //Se comprueba si el valor de n es mayor que la cantidad total de imagenes, si es así nos lleva a la primera
  }
  if (n < 1) {
    slideIndex = slides.length; //nos llevará a la última diapositiva si intentamos avanzar hacia atrás desde la primera diapositiva
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; //se recorren todas las imagenes en el bucle y se ocultan todas inicialmente
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", ""); //se recorren todos los puntos, y se elimina la clase active para que ninguno esté iluminado de primeras
  }

  slides[slideIndex - 1].style.display = "block"; //se muestra la diap actual
  dots[slideIndex - 1].className += " active"; //se pone en negro el punto indicador correspondiente a la foto en la que estemos
}

// Configura un temporizador separado para avanzar automáticamente cada 3 segundos
setInterval(function () {
  plusSlides(1);
}, 3000);