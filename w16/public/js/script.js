document.addEventListener('DOMContentLoaded', () => {
  // Image slider for gallery
  const slider = document.querySelector('.gallery-slider');
  if (slider) {
      let currentSlide = 0;
      const slides = document.querySelectorAll('.gallery-item');
      
      setInterval(() => {
          slides[currentSlide].classList.remove('active');
          currentSlide = (currentSlide + 1) % slides.length;
          slides[currentSlide].classList.add('active');
      }, 5000);
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  
  if (menuToggle) {
      menuToggle.addEventListener('click', () => {
          nav.classList.toggle('active');
      });
  }
});