const inputElement = document.querySelector('#search-input');

inputElement.addEventListener('focus', function() {
  this.parentElement.classList.add('focus');
});

inputElement.addEventListener('blur', function() {
  this.parentElement.classList.remove('focus');
});

var mainSwiper = new Swiper(".main-swiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

var mainBrandSwiper = new Swiper(".brand-swiper", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 24,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
      el: ".swiper-pagination",
  },
});