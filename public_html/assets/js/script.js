const slider = new Swiper('.swiper', {
  slidesPerView: 1,
  // loop: true,
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.slider .swiper-button-next',
  },
})




window.addEventListener('resize', () => {
  const sp = 768;
  const windowSize = window.outerWidth;
  const slideImgs = document.querySelectorAll('.swiper-slide img');
  if (windowSize >= sp) {
    slideImgs.forEach((slideImg, index) => {
      console.log(slideImg);
      console.log(index + 1);
      slideImg.setAttribute('src', `./assets/img/img-FV-0${index + 1}_PC.webp`)
    });
  } else {
    slideImgs.forEach((slideImg, index) => {
      console.log(slideImg);
      console.log(index + 1);
      slideImg.setAttribute('src', `./assets/img/img-FV-0${index + 1}_SP.webp`)
    });
  }
})

