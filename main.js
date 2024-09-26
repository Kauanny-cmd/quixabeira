/* Seção 1: Ativa seção atual com base no scroll */
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section-now');
  const navLinks = document.querySelectorAll('.navbar .nav-link');

  function activateLink() {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;

      if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight >= 0) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(currentSection) && currentSection != '') {
        link.classList.add('active');
      }
    });
    console.log(currentSection);
  }

  // Inicializa na primeira execução
  activateLink();

  // Monitora o scroll
  window.addEventListener('scroll', activateLink);
});

/* Seção 2: Menu hamburguer */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

navLinks.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

/* Seção 3: Controle do carrossel */
const carousel = document.querySelector('.carousel-inner');
const indicators = document.querySelectorAll('.carousel-indicators button');
let currentIndex = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;

function showSlide(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
  indicators.forEach((button, i) => {
    button.classList.toggle('active', i === index);
  });
}

indicators.forEach((button, index) => {
  button.addEventListener('click', () => {
    currentIndex = index;
    showSlide(currentIndex);
  });
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalItems;
  showSlide(currentIndex);
}, 8000);

// Toque de funcionalidade
let startX = 0;
let isDragging = false;

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

carousel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const difference = startX - currentX;

  if (difference > 50) {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
    isDragging = false;
  } else if (difference < -50) {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showSlide(currentIndex);
    isDragging = false;
  }
});

carousel.addEventListener('touchend', () => {
  isDragging = false;
});

/* Seção 4: Ativação de botões de categorias */
document.querySelectorAll('.btt-categ').forEach(button => {
  button.addEventListener('click', function () {
    document.querySelectorAll('.btt-categ').forEach(element => {
      element.classList.remove('selected');
    });
    this.classList.add('selected');
  });
});

/* Seção 5: Atualização da view dos produtos com abas */
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.btt-categ');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function () {
      // Remover a classe 'selected' e 'show' de todas as abas e conteúdo
      tabs.forEach(t => t.classList.remove('selected', 'active'));
      tabPanes.forEach(pane => {
        pane.classList.remove('show', 'active');
        pane.style.opacity = '0'; // Garantir que a opacidade esteja ajustada
        pane.style.visibility = 'hidden'; // Garantir que a visibilidade esteja ajustada
      });

      // Adicionar a classe 'selected' e 'show' para a aba e conteúdo clicados
      tab.classList.add('selected', 'active');
      tabPanes[index].classList.add('show', 'active');
      tabPanes[index].style.opacity = '1'; // Garantir que a opacidade esteja ajustada
      tabPanes[index].style.visibility = 'visible'; // Garantir que a visibilidade esteja ajustada
    });
  });
});

/* Seção 6: Controle de modal */
// Seleciona os elementos do modal
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('customModal');

// Função para abrir o modal
openModalBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Impede o comportamento padrão do link
  modal.style.display = 'block'; // Exibe o modal
});

// Função para fechar o modal
closeModalBtn.addEventListener('click', function() {
  modal.style.display = 'none'; // Oculta o modal
});

// Fecha o modal ao clicar fora dele
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

/* Seção 7: Atualiza o ano automaticamente no footer */
document.getElementById("current-year").textContent = new Date().getFullYear();

/* Seção 8: Scrool */
const menuLinks = document.querySelectorAll('.navbar a[href^="#"]');

function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

// function nativeScroll(distanceFromTheTop) {
//   window.scroll({
//     top: distanceFromTheTop,
//     behavior: "smooth",
//   });
// }

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
  smoothScrollTo(0, distanceFromTheTop);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
}