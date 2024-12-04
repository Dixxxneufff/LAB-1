let slideIndex = 1;
showSlides(slideIndex); // Inicializa el índice de la diapositiva actual

function plusSlides(n) {
  showSlides(slideIndex += n); // Avanza o retrocede en las diapositivas
}

function currentSlide(n) {
  showSlides(slideIndex = n); // Muestra una diapositiva específica
}

// Define la función principal para mostrar las diapositivas
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide"); // Cambiado a "slide"
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1; // Si el índice excede el número de diapositivas, vuelve a la primera
  }
  if (n < 1) {
    slideIndex = slides.length; // Si el índice es menor a 1, muestra la última diapositiva
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Oculta todas las diapositivas
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", ""); // Elimina la clase "active" de todos los puntos
  }

  slides[slideIndex - 1].style.display = "block"; // Muestra la diapositiva actual
  dots[slideIndex - 1].className += " active"; // Activa el punto correspondiente
}

// Configuración automática para avanzar las diapositivas cada 3 segundos
setInterval(() => {
  plusSlides(1);
}, 3000);
