const modal = document.getElementById("serviceModal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");

const servicesData = [
  {
    name: "Spa de lujo",
    image: "/images/spa1.jpg",
    description: "Relájate en nuestro exclusivo spa con tratamientos personalizados y áreas de relajación."
  },
  {
    name: "Gimnasio",
    image: "/images/gym1.jpg",
    description: "Mantente en forma en nuestro gimnasio totalmente equipado con vistas espectaculares."
  },
  {
    name: "Restaurante gourmet",
    image: "/images/restaurant1.jpg",
    description: "Disfruta de una experiencia culinaria única con platos de alta gastronomía."
  },
  {
    name: "Piscina climatizada",
    image: "/images/pool1.jpg",
    description: "Nada en nuestra piscina climatizada con temperatura ideal durante todo el año."
  }
];

function openModal(index) {
  const service = servicesData[index];
  modalImage.src = service.image;
  modalTitle.textContent = service.name;
  modalDescription.textContent = service.description;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

