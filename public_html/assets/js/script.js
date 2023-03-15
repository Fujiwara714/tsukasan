//ハンバーガーメニュー
const hamBtn = document.querySelector('.header__inner__hamburger');
const html = document.getElementsByTagName('html');
hamBtn.addEventListener('click', () => {
  const nav = document.querySelector('.header__nav')
  const navLines = document.querySelectorAll('.header__nav__ul__li');
  hamBtn.classList.toggle('is-active');
  nav.classList.toggle('is-active');
  html[0].classList.toggle('is-active');
  navLines.forEach(navLine => {
    console.log(navLine);
    navLine.classList.toggle('is-active');
  })
});

//スライド
const sliderTop = new Swiper('.swiperTop', {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 3000,//単位：ms 1000ms = 1s
    disableOnInteraction: false,//ドラッグしても自動再生が止まらない
  },
  pagination: {
    el: '.swiper-top-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.slider .swiper-top-button-next',
  }
})

const sliderVoice = new Swiper('.swiperVoice', {
  slidesPerView: 1,
  loop: true,
  // autoplay: {
  //   delay: 3000,//単位：ms 1000ms = 1s
  //   disableOnInteraction: false,//ドラッグしても自動再生が止まらない
  // },
  navigation: {
    nextEl: '.slider-voice .swiper-button-next',
    prevEl: '.slider-voice .swiper-button-prev',
  }
})