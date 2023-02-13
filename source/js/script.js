(function () {
  // Swiper

  const bannersSlider = document.querySelector('.banners__slider');
  const bannersPagination = bannersSlider.querySelector('.swiper-pagination');

  const mySwiper = new Swiper(bannersSlider, {
    slidesPerView: '1',
    watchSlidesProgress: true,

    pagination: {
      el: bannersPagination,
      type: 'bullets',
      clickable: true,
    },
  });


  const rewievsSlider = document.querySelector('.rewievs__slider');
  const rewievsPagination = rewievsSlider.querySelector('.swiper-pagination');

  const mySwiper2 = new Swiper(rewievsSlider, {
    slidesPerView: '4',
    spaceBetween: 30,
    watchSlidesProgress: true,

    breakpoints: {
      320: {
        slidesPerView: '1',
        spaceBetween: 0,
      },
      768: {
        slidesPerView: '3',
      },
    },

    navigation: {
      nextEl: '.rewievs__btn--next',
      prevEl: '.rewievs__btn--prev',
    },

    pagination: {
      el: rewievsPagination,
      type: 'bullets',
      clickable: true,
    },
  });

  // Mobile open menu

  const catalogWrap = document.querySelector('.navigation');
  const catalogToggle = catalogWrap.querySelector('.navigation__toggle');

  const menuWrap = document.querySelector('.catalog')
  const menuToggle = menuWrap.querySelector('.catalog__toggle');

  catalogToggle.addEventListener('click', () =>{
    if (catalogWrap.classList.contains('navigation--open')) {
      catalogWrap.classList.remove('navigation--open')
    } else {
      catalogWrap.classList.add('navigation--open')
    }
  })

  menuToggle.addEventListener('click', () =>{
    if (menuWrap.classList.contains('catalog--open')) {
      menuWrap.classList.remove('catalog--open')
    } else {
      menuWrap.classList.add('catalog--open')
    }
  })
})();
