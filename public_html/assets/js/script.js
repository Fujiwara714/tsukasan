//ハンバーガーメニュー
const headerMenu = () => {
  const hamBtn = document.querySelector('.header__inner__hamburger');
  const html = document.getElementsByTagName('html');
  const nav = document.querySelector('.header__nav')
  const navLines = document.querySelectorAll('.header__nav__ul__li');
  hamBtn.addEventListener('click', () => {
    hamBtn.classList.toggle('is-active');
    nav.classList.toggle('is-active');
    html[0].classList.toggle('is-active');
    navLines.forEach(navLine => {
      navLine.classList.toggle('is-active');
    })
  });

  const headerNavAs = document.querySelectorAll('.header-link');
  headerNavAs.forEach(headerNavA => {
    headerNavA.addEventListener('click', () => {
      nav.classList.remove('is-active');
      hamBtn.classList.remove('is-active');
      html[0].classList.remove('is-active');
      navLines.forEach(navLine => {
        navLine.classList.remove('is-active');
      })
    })
  })

  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// エントリー部分に遷移
const scrollEntry = () => {
  const scrollButtons = document.querySelectorAll('.entry-scroll');
  const entrySection = document.querySelector('#entry');
  scrollButtons.forEach(scrollButton => {
    scrollButton.addEventListener('click', () => {
      entrySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  })
}

// トップに戻るボタン
const scrollTop = () => {
  const scrollToTopButton = document.querySelector('.footer-bottom__top-Scroll-btn');

  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

//スライドショー
const slideShow = () => {
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
}

// アコーディオン
const accordion = () => {
  // slideUp
  const slideUp = (el, duration = 500) => {
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

  // 同じ階層の要素全て取得
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
  // 親要素の同じ階層の要素全て取得(element以外)
  const getParents = (element) => {
    var parent = element.parentNode;
    return getSiblings(parent);
  }

  const accordionTitles = document.querySelectorAll('.accordion__title');
  accordionTitles.forEach((accordionTitle) => {
    accordionTitle.addEventListener('click', function () {
      accordionTitle.classList.toggle('is-active');
      slideToggle(accordionTitle.nextElementSibling);

      // 常に開いているアコーディオンは一つの状態
      const accordionItems = getParents(accordionTitle);
      accordionItems.forEach(accordionItem => {
        const targetTitle = accordionItem.querySelector('.accordion__title');
        const targetContent = accordionItem.querySelector('.accordion__content');
        slideUp(targetContent);
        targetTitle.classList.remove('is-active');
      })
    })
  })
}

// フォームバリデーション
const validate = () => {
  const formInner = document.querySelector('.form__inner');
  const submit = document.querySelector('.submit');
  const name = document.querySelector('#name');
  const kana = document.querySelector('#kana');
  const zip = document.querySelector('#zip');
  const address = document.querySelector('#address');
  const tel = document.querySelector('#tel');
  const email = document.querySelector('#email');
  const emailRe = document.querySelector('#email-re');
  const checkBox = document.querySelector('#checkbox');

  const errMsgName = document.querySelector('.err-msg-name');
  const errMsgKana = document.querySelector('.err-msg-kana');
  const errMsgZip = document.querySelector('.err-msg-zip');
  const errMsgAddress = document.querySelector('.err-msg-address');
  const errMsgTel = document.querySelector('.err-msg-tel');
  const errMsgEmail = document.querySelector('.err-msg-email');
  const errMsgEmailRe = document.querySelector('.err-msg-emailre');
  const errMsgCheckBox = document.querySelector('.err-msg-checkbox');

  // フォームバリデーション
  submit.addEventListener('click', (e) => {

    // デフォルトアクションをキャンセル
    e.preventDefault();

    if (formInner.checkValidity()) {
      setTimeout(() => {
        location.assign('../../thanks.html');
      }, 500);
    } else {
      if (!name.value) {
        errMsgName.classList.add('error-active');
        errMsgName.textContent = '入力してください';
        name.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      } else {
        errMsgName.classList.remove('error-active');
        errMsgName.textContent = '';
      }

      if (!kana.value) {
        errMsgKana.classList.add('error-active');
        errMsgKana.textContent = '入力してください';
        kana.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      } else {
        errMsgKana.classList.remove('error-active');
        errMsgKana.textContent = '';
      }

      if (!zip.value.match(/^[0-9]{3}-?[0-9]{4}$/)) {
        errMsgZip.classList.add('error-active');
        errMsgZip.textContent = '入力してください';
        zip.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      } else {
        errMsgZip.textContent = '';
        errMsgZip.classList.remove('error-active');
      }
      if (!address.value) {
        errMsgAddress.classList.add('error-active');
        errMsgAddress.textContent = '入力してください';
        address.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      } else {
        errMsgAddress.classList.remove('error-active');
        errMsgAddress.textContent = '';
      }

      if (!tel.value) {
        errMsgTel.classList.add('error-active');
        errMsgTel.textContent = '入力してください';
        tel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      } else {
        errMsgTel.classList.remove('error-active');
        errMsgTel.textContent = '';
      }

      if (!email.value.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/)) {
        errMsgEmail.classList.add('error-active');
        errMsgEmail.textContent = '入力してください';
        email.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      } else {
        errMsgEmail.classList.remove('error-active');
        errMsgEmail.textContent = '';
      }

      if (email.value !== emailRe.value) {
        errMsgEmailRe.classList.add('error-active');
        errMsgEmailRe.textContent = '入力してください';
        emailRe.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      } else {
        errMsgEmailRe.classList.remove('error-active');
        errMsgEmailRe.textContent = '';
      }

      if (!checkBox.checked) {
        errMsgCheckBox.classList.add('error-active');
        errMsgCheckBox.textContent = '入力してください';
        checkBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      } else {
        errMsgCheckBox.classList.remove('error-active');
        errMsgCheckBox.textContent = '';
      }
    }
  }, false);

  // 郵便番号API
  zip.addEventListener('input', e => {
    fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${e.target.value}`)
      // 取得したデータをjson形式で読み込み。
      .then(response => response.json())
      // 取得したデータを出力
      .then(data => {
        address.value = data.results[0].address1 + data.results[0].address2 + data.results[0].address3;
      })
      .catch(error)
  })
}

// モーダル
const modalFunction = () => {
  const openModalBtn = document.getElementById("open-form-modal");
  const modal = document.getElementById("modal");

  openModalBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  });


  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  });
}

const setScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  // カスタムプロパティの値を更新する
  document.documentElement.style.setProperty('--scrollbar', `${scrollbarWidth}px`);
};

// 表示されたとき
window.addEventListener('load', setScrollbarWidth);
// リサイズしたとき
window.addEventListener('resize', setScrollbarWidth);

window.addEventListener('DOMContentLoaded', () => {
  headerMenu();
  slideShow();
  scrollEntry();
  scrollTop();
  accordion();
  validate();
  modalFunction();
});