window.addEventListener('load', () => {
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
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-top-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider .swiper-top-button-next',
    }
  })

  const sliderVoice_SP = new Swiper('.swiperVoice-sp', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.slider-voice-sp .swiper-button-next',
      prevEl: '.slider-voice-sp .swiper-button-prev',
    }
  });

  const sliderVoice_PC = new Swiper('.swiperVoice-pc', {
    speed: 14000,
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    freeMode: true,
    simulateTouch: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }
  });

  // アコーディオン
  // slideUp
  const slideUp = (el, duration = 300) => {
    el.style.height = el.offsetHeight + "px";
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    setTimeout(() => {
      el.style.display = "none";
      el.style.removeProperty("height");
      el.style.removeProperty("padding-top");
      el.style.removeProperty("padding-bottom");
      el.style.removeProperty("margin-top");
      el.style.removeProperty("margin-bottom");
      el.style.removeProperty("overflow");
      el.style.removeProperty("transition-duration");
      el.style.removeProperty("transition-property");
      el.style.removeProperty("transition-timing-function");
    }, duration);
  };

  // slideDown
  const slideDown = (el, duration = 300) => {
    el.style.removeProperty("display");
    let display = window.getComputedStyle(el).display;
    if (display === "none") {
      display = "block";
    }
    el.style.display = display;
    let height = el.offsetHeight;
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.height = height + "px";
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    setTimeout(() => {
      el.style.removeProperty("height");
      el.style.removeProperty("overflow");
      el.style.removeProperty("transition-duration");
      el.style.removeProperty("transition-property");
      el.style.removeProperty("transition-timing-function");
    }, duration);
  };

  // slideToggle
  const slideToggle = (el, duration = 300) => {
    if (window.getComputedStyle(el).display === "none") {
      return slideDown(el, duration);
    } else {
      return slideUp(el, duration);
    }
  };

  // 同じ階層(並列or兄弟)の要素全て取得
  const getSiblings = (e) => {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
      return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;

    // collecting siblings
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  };

  // 親の要素全て取得(element(e))
  const getParents = (e) => {
    const parent = e.parentNode;
    return getSiblings(parent);
  }

  const accordionTitles = document.querySelectorAll(`.accordion__title`);
  accordionTitles.forEach(accordionTitle => {
    accordionTitle.addEventListener('click', () => {
      accordionTitle.classList.toggle('is-active');
      slideToggle(accordionTitle.nextElementSibling);

      // 常に開いているアコーディオンは一つの状態
      const accordionItems = getParents(accordionTitle);
      accordionItems.forEach(accordionItem => {
        const targetTitle = accordionItem.querySelector('.accordion__title');
        const targetContent = accordionItem.querySelector('.accordion__content');
        targetTitle.classList.remove('is-active');
        slideUp(targetContent);
      })
    })
  })
})