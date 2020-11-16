// Прелоадер
 if (document.querySelectorAll('.preloader').length > 0) {
    function load() {
      setTimeout(() => {
          let preloader = document.querySelector('.preloader');
          let body = document.querySelector('body');
          if (!preloader.classList.contains('done')){
              preloader.classList.add('done');  
              body.classList.remove('lock')
          } 
          
      }, 4000);
    }
    load();
    // Отсчет чисел
    const time = 3000;
    const step = 1;

    function outNum(num) {
    let preloader__number = document.querySelector('.preloader__number');
    let count = 0;
    let timeReduce = Math.round(time / (num / step));
    let interval = setInterval(() => {
        
        count = count + step;
        if (count  == num) {
        clearInterval(interval);
        }
        preloader__number.innerHTML = count + '%';
    }, timeReduce);
    }
    outNum(100);
}
// Добавляет на декстопе класс к ссылкам чтоб видеть где мы находимся
if (document.documentElement.offsetWidth > 769) {
    try{
        let el=document.getElementById('menu-main').getElementsByTagName('a');
        let url = document.location.href;
            for(let i = 0; i < el.length; i++){
            if (url == el[i].href){
                el[i].className += ' active';
            };
        };
    }catch(e){};
}


// Анимация
const animate = document.querySelectorAll('.animate-all');
animate.forEach(el => {
    if (document.documentElement.offsetWidth > 769) {
        el.classList.add('animate__animated', 'animate__fadeInUp');
    } else {
        el.classList.remove('animate__animated','animate__fadeInUp');
    }
    
})
// Dekstop vars
const defaultFontSize = 16;
const defaultWidth = 1366;
const reduce = defaultWidth / defaultFontSize;
const defaultFontSizeMob = 4.26667;

// функция отвечает за динамический адаптив при ресайзе до 769 в пикселях
    function recalcRem() {
        let currentWidth = document.documentElement.offsetWidth;
        const currentFZ = currentWidth / reduce;
        if (currentWidth > 1366) {
            currentWidth = defaultWidth;
        } else {
            document.documentElement.style.fontSize = currentFZ + 'px';
        }
    }
// Тут функция на viewport + в else функция на декстоп (Проверка норм)
function fontSizeHandler() {
    if (document.documentElement.offsetWidth < 769) {
        document.documentElement.style.fontSize = defaultFontSizeMob + 'vw';
    } else {
        recalcRem();
    }
}
fontSizeHandler();
// Ресайз + передеача в аргументы функцию
window.addEventListener('resize', fontSizeHandler);

// Tabs
const $linewiveBtn = document.querySelectorAll('.categories__cards'),
      // $linewivesItem = document.querySelectorAll('.tabs__content .categories__image'),
      $content = document.querySelectorAll('.tabs__content'),
      $preview = document.querySelector('.categories__inner-content-preview');

const onTabClick = (item, i) => {
    item.addEventListener('click', () => {
      $preview.classList.add('hidden');
        let currentBtn = item;
        if (!currentBtn.classList.contains('active')){
            for (let ind = 0; ind < $linewiveBtn.length; ind++) {
                $linewiveBtn[ind].classList.remove('active');
                $content[ind].classList.remove('active');
            };
            $linewiveBtn[i].classList.add('active');
            $content[i].classList.add('active');
            $content[i].scrollIntoView({block: "start", behavior: "smooth"});
        }
       
    })
   
}
$linewiveBtn.forEach(onTabClick);


// Попап философия
if (document.querySelectorAll('.popup__philosof').length > 0) {
    const philosofModal = document.querySelector('.popup__philosof'),
          philosofCloseModalBtn = document.querySelector('.popup__philosof-close'),
          body = document.querySelector('body');
        philosofCloseModalBtn.addEventListener('click', () => {
            philosofModal.classList.remove('active');
            body.classList.remove('lock')
           
        })
        window.addEventListener('click', function (el) {
            if (el.target == philosofModal ) {
                philosofModal.classList.remove('active');
                body.classList.remove('lock')
            }
        })
}
// Forms popup
if (document.querySelectorAll('.forms__popup').length > 0) {
    const formsModal = document.getElementById('modal__popup-forms'),
          formsOpenModalBtn = document.getElementById('forms__popup-send'),
          formsCloseModalBtn = document.querySelector('.forms__popup-close'),
          body = document.querySelector('body');

    formsOpenModalBtn.addEventListener('click', () => {
        formsModal.classList.add('active');
        body.classList.add('lock');
    })
    formsCloseModalBtn.addEventListener('click', () => {
        formsModal.classList.remove('active');
        body.classList.remove('lock');
    })
    window.addEventListener('click', function (el) {
        if (el.target == formsModal ) {
            formsModal.classList.remove('active');
        }
    })
}




//! Загрузка изображений в блоке gallery под мобилу
const windowMobile = document.documentElement.offsetWidth;
    if (windowMobile < 769) {
        let img = document.querySelectorAll('.gallery__image');
        
        img.forEach(el => {
            let newImage = el.getAttribute("data-src");
            el.style.backgroundImage = newImage;
        });
    }
//? slider for gallery intro
if (document.querySelectorAll('.swiper-container.gallery__carousel').length > 0) {
    var mySwiper = new Swiper('.swiper-container.gallery__carousel', {
        loop: true,
        speed: 1200,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
}
// TODO slider для categories ничего тут не трогать ВАЖНАЯ ЧАСТЬ
 let cards = document.querySelectorAll('.categories__cards-slide');
 let isCardShown = document.querySelector('.categories__inner-title');
 cards.forEach(el => {
     el.addEventListener('click', function() {
         let textChange = 'Другие продукты';
         isCardShown.textContent = textChange;
     })
 })
 if (document.documentElement.offsetWidth > 769 || cards.length > 4 || document.documentElement.offsetWidth <= 769) {
    var mySwiperCategories = new Swiper('.swiper-container.categories__slider', {
        loop: true,
        slidesPerView: 2,
        slidesPerGroup: 1,
        breakpoints: {
            769: {
              slidesPerView: 4,
              loop:false,
            }
          },
        speed: 1200,
        navigation: {
          nextEl: '.swiper-button-next.categories__next',
          prevEl: '.swiper-button-prev.categories__prev',
        },
        on: {
            init: function() {
                    checkArrow();
            },
             resize: function () {
                    checkArrow();
            }
          }
      })
    
 }
function checkArrow() {
    let swiperPrev = document.querySelector('.swiper-button-prev.categories__prev');
    let swiperNext = document.querySelector('.swiper-button-next.categories__next');
    if ((document.documentElement.offsetWidth > 769 && cards.length > 4) || document.documentElement.offsetWidth <= 769) {
          swiperPrev.style.display = 'flex';
          swiperNext.style.display = 'flex';
    } else {
        swiperPrev.style.display = 'none';
        swiperNext.style.display = 'none';
    } 
}
//! Burger menu
    const $body = document.querySelector('body'),
    $menuButton = document.querySelector('.header__burger'),
    $menu = document.querySelector('.menu'),
    $menuItems = document.querySelectorAll('.menu__list-link'),
    $header = document.querySelector('.header');
        $menuButton.addEventListener('click', () => {
            $menuButton.classList.toggle('active');
            $menu.classList.toggle('active');
            $header.classList.toggle('active');
            if (!$body.classList.contains('lock')) {
                $body.classList.add('lock');
            } else {
                $body.classList.remove('lock');
            }
          
            for (let navItems of $menuItems) {
                navItems.addEventListener('click', () => {
                    $menuButton.classList.remove('active')
                    $menu.classList.remove('active')
                })
            }
          });

  //? slider for main-cards
  if (document.querySelectorAll('.swiper-container.cards__carousel').length > 0) {
    var mySwiper = new Swiper('.swiper-container.cards__carousel', {
        slidesPerView: 'auto',
        slidesPerGroup: 2,
        loop: true,
        breakpoints: {
            769: {
                slidesPerGroup: 1,
                loop: false,
            }
          },
       
        spaceBetween: 15,
        speed: 2000,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
  }
 


