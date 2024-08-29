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
/* Controle do carrossel - Fim */

/* Ativação dos produtos */
document.querySelectorAll('.btt-categ').forEach(button =>{
  button.addEventListener('click',function(){
    document.querySelectorAll('.btt-categ').forEach(element => {
      element.classList.remove('selected');
    });
    this.classList.add('selected');
  })
})

/* Atualiza o ano */
document.getElementById("current-year").textContent = new Date().getFullYear();