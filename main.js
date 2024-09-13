/* Ativa seção atual */
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section-now'); // Seleciona os divs com a classe top-main
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

/* Nav hamburguer */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

/* Controle do carrossel */
const carousel = document.querySelector('#carouselExampleIndicators');
let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', () => {
  if (startX > endX + 50) {
    // Deslizar para a esquerda
    bootstrap.Carousel.getInstance(carousel).next();
  } else if (startX < endX - 50) {
    // Deslizar para a direita
    bootstrap.Carousel.getInstance(carousel).prev();
  }
});

/* Ativação dos produtos */
document.querySelectorAll('.btt-categ').forEach(button =>{
  button.addEventListener('click',function(){
    document.querySelectorAll('.btt-categ').forEach(element => {
      element.classList.remove('selected');
    });
    this.classList.add('selected');
  })
})

/* Atualiza view dos produtos */
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.btt-categ');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function () {
      // Remover a classe 'active' de todas as abas e conteúdo
      tabs.forEach(t => t.classList.remove('selected', 'active'));
      tabPanes.forEach(pane => pane.classList.remove('show', 'active','products'));

      // Adicionar a classe 'active' para a aba e conteúdo clicados
      tab.classList.add('selected', 'active');
      tabPanes[index].classList.add('show', 'active');
    });
  });
});

/* Atualiza o ano */
document.getElementById("current-year").textContent = new Date().getFullYear();