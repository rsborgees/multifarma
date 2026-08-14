(function () {
  var phoneMockupImg = document.querySelector('.phone-mockup img');
  var phoneSlides = ['assets/img/phone-screen.jpg', 'assets/img/phone-screen-2.png', 'assets/img/phone-screen-3.png'];
  var dots = document.querySelectorAll('.phone-carousel__dots button');
  var prevBtn = document.querySelector('.phone-carousel__arrow--prev');
  var nextBtn = document.querySelector('.phone-carousel__arrow--next');
  var active = 0;

  function setActive(index) {
    active = (index + dots.length) % dots.length;
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === active);
    });
    if (phoneMockupImg && phoneSlides[active]) phoneMockupImg.src = phoneSlides[active];
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { setActive(i); });
  });

  if (prevBtn) prevBtn.addEventListener('click', function () { setActive(active - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { setActive(active + 1); });

  var bannerSlides = document.querySelectorAll('.banner__slide');
  var bannerDots = document.querySelectorAll('.banner__dots button');
  var bannerPrev = document.querySelector('.banner__arrow--prev');
  var bannerNext = document.querySelector('.banner__arrow--next');
  var bannerActive = 0;

  function setBannerActive(index) {
    bannerActive = (index + bannerDots.length) % bannerDots.length;
    bannerDots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === bannerActive);
    });
    bannerSlides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === bannerActive);
    });
  }

  bannerDots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { setBannerActive(i); });
  });

  if (bannerPrev) bannerPrev.addEventListener('click', function () { setBannerActive(bannerActive - 1); });
  if (bannerNext) bannerNext.addEventListener('click', function () { setBannerActive(bannerActive + 1); });

  var revealEls = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--rise, .reveal--zoom, .reveal--group');

  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

      revealEls.forEach(function (el) { observer.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  var form = document.getElementById('contact-form');
  var feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var submitBtn = form.querySelector('.btn-submit');
      if (submitBtn) submitBtn.disabled = true;
      feedback.textContent = 'Enviando...';

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Falha no envio');
          feedback.textContent = 'Obrigado! Recebemos seus dados e entraremos em contato em breve.';
          form.reset();
        })
        .catch(function () {
          feedback.textContent = 'Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.';
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
