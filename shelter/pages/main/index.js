console.log('1. Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n2. Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n 3. Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n4. Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n5. Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n6. Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n7. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n8. Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n9. При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\nОткрытие меню при клике на иконку бургер-меню на текущем этапе не проверяется\n10. Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8')

const SLIDER = document.querySelector('.slider__wraper');
const LEFT_BTN = document.querySelector('#btn-left');
const RIGHT_BTN = document.querySelector('#btn-right');
const media1220 = window.matchMedia('(max-width: 1220px)');
const media767 = window.matchMedia('(max-width: 767px)');
let countCards;
let left;
let flag = false;//flag for break
let random = [0, 1, 2, 3, 4, 5, 6, 7];
let animals = [
  {
    name: "Jennifer",
    img: "../../assets/images/pets/jennifer.png",
    imgModal: "../../assets/images/pets-hight500/modal/jennifer.png",
    type: "Dog",
    breed: "Labrador",
    description: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: "2 months",
    inoculations: [],
    diseases: [],
    parasites: []
  },
  {
    name: "Sophia",
    img: "../../assets/images/pets/sophia.png",
    imgModal: "../../assets/images/pets-hight500/modal/sophia.png",
    type: "Dog",
    breed: "Shih tzu",
    description: "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: "1 month",
    inoculations: ["parvovirus"],
    diseases: [],
    parasites: []
  },
  {
    name: "Woody",
    img: "../../assets/images/pets/woody.png",
    imgModal: "../../assets/images/pets-hight500/modal/woody.png",
    type: "Dog",
    breed: "Golden Retriever",
    description: "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    age: "3 years 6 months",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["right back leg mobility reduced"],
    parasites: []
  },
  {
    name: "Scarlett",
    img: "../../assets/images/pets/scarlett.png",
    imgModal: "../../assets/images/pets-hight500/modal/scarlett.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description: "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    age: "3 months",
    inoculations: ["parainfluenza"],
    diseases: [],
    parasites: []
  },
  {
    name: "Katrine",
    img: "../../assets/images/pets/katrine.png",
    imgModal: "../../assets/images/pets-hight500/modal/katrine.png",
    type: "Cat",
    breed: "British Shorthair",
    description: "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    age: "6 months",
    inoculations: ["panleukopenia"],
    diseases: [],
    parasites: []
  },
  {
    name: "Timmy",
    img: "../../assets/images/pets/timmy.png",
    imgModal: "../../assets/images/pets-hight500/modal/timmy.png",
    type: "Cat",
    breed: "British Shorthair",
    description: "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    age: "2 years 3 months",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
    diseases: ["kidney stones"],
    parasites: []
  },
  {
    name: "Freddie",
    img: "../../assets/images/pets/freddie.png",
    imgModal: "../../assets/images/pets-hight500/modal/freddie.png",
    type: "Cat",
    breed: "British Shorthair",
    description: "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    age: "2 months",
    inoculations: ["rabies"],
    diseases: [],
    parasites: []
  },
  {
    name: "Charly",
    img: "../../assets/images/pets/charly.png",
    imgModal: "../../assets/images/pets-hight500/modal/charly.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description: "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    age: "8 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["deafness", "blindness"],
    parasites: ["lice", "fleas"]
  }
];
let num;//number of cards in card__container

//for shuffle pets massive index
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

//for open and closed burger menu
function navBurger() {
  let navMenu = document.querySelector('.header__nav');
  let burger = document.querySelector('.burger');
  let modal = document.getElementById('modal-nav');
  let height = document.documentElement.clientHeight;
  let width = window.innerWidth;
  let top = document.documentElement.scrollTop; //top overflow position
  let scroll = width - document.body.clientWidth;
  if (navMenu.classList.contains('header__nav_visible')) {
    /*     setTimeout(() => {
          navMenu.style.height = '';
          navMenu.style.top = '';
          modal.style.top = '';
        }, 500);//for transition
     */
    navMenu.classList.remove('header__nav_visible');
    burger.classList.remove('burger_rotate');
    modal.classList.remove('modal_vicible');
    document.body.classList.remove('overflow');
    document.body.style.paddingRight = ``


  } else if (width < 768) {
    navMenu.style.height = `${height}px`;
    navMenu.style.top = `${top}px`;
    modal.style.top = `${top}px`;
    navMenu.classList.add('header__nav_visible');
    burger.classList.add('burger_rotate');
    modal.classList.add('modal_vicible');
    document.body.classList.add('overflow');
    document.body.style.paddingRight = `${scroll}px`

  }
}

//////Slider start////////
//Вычисляет количество карточек в слайдере при загрузке
function numerCards() {
  const width = document.querySelector('.card__container').clientWidth;
  width === 990 ? countCards = 3 : width === 580 ? countCards = 2 : countCards = 1;
}

function goLeft() {
  left = true;
  SLIDER.classList.add('slider__wraper_animation-right');
  RIGHT_BTN.removeEventListener('click', goRight);//remoove event on animation time
  LEFT_BTN.removeEventListener('click', goLeft);//remoove event on animation time
}

function goRight() {
  left = false;
  SLIDER.classList.add('slider__wraper_animation-left');
  LEFT_BTN.removeEventListener('click', goLeft);//remoove event on animation time
  RIGHT_BTN.removeEventListener('click', goRight);//remoove event on animation time
}

//for add random pets in pets center card container
function addCardCenter(number) {
  shuffle(random);
  const CARD_CONTAINER = document.querySelectorAll('.card__container');
  const OBJ_IMG = CARD_CONTAINER[1].querySelectorAll('.card__img');
  const OBJ_TITLE = CARD_CONTAINER[1].querySelectorAll('.card_title');

  for (let i = 0; i < number; i++) {
    OBJ_IMG[i].setAttribute('src', animals[random[i]].img);
    OBJ_IMG[i].setAttribute('alt', animals[random[i]].name);
    OBJ_IMG[i].setAttribute('id', random[i]);
    OBJ_TITLE[i].innerText = animals[random[i]].name;
    random[i] === 1 ? OBJ_IMG[i].classList.add('card_sophia') : OBJ_IMG[i].classList.remove('card_sophia');
  }
}

//for add random pets in pets left card container
function addCardLeft(number) {
  shuffle(random);
  const CARD_CONTAINER = document.querySelectorAll('.card__container');
  const OBJ_IMG = CARD_CONTAINER[0].querySelectorAll('.card__img');
  const OBJ_TITLE = CARD_CONTAINER[0].querySelectorAll('.card_title');
  let i = 0;

  for (const index of random) {
    for (let k = 0; k < number; k++) {
      if (+CARD_CONTAINER[1].querySelectorAll('.card__img')[k].getAttribute('id') === index) {
        flag = true;
        break;
      }
    }
    if (flag) {
      flag = false;
      continue;
    }
    OBJ_IMG[i].setAttribute('src', animals[index].img);
    OBJ_IMG[i].setAttribute('alt', animals[index].name);
    OBJ_IMG[i].setAttribute('id', index);
    OBJ_TITLE[i].innerText = animals[index].name;
    index === 1 ? OBJ_IMG[i].classList.add('card_sophia') : OBJ_IMG[i].classList.remove('card_sophia');
    i++;
    if (i >= number) break;
  }
}

//for add random pets in pets right card container
function addCardRight(number) {
  shuffle(random);
  const CARD_CONTAINER = document.querySelectorAll('.card__container');
  const OBJ_IMG = CARD_CONTAINER[2].querySelectorAll('.card__img');
  const OBJ_TITLE = CARD_CONTAINER[2].querySelectorAll('.card_title');
  let i = 0;

  for (const index of random) {
    for (let k = 0; k < number; k++) {
      if (+CARD_CONTAINER[1].querySelectorAll('.card__img')[k].getAttribute('id') === index) {
        flag = true;
        break;
      }
    }
    if (flag) {
      flag = false;
      continue;

    }
    OBJ_IMG[i].setAttribute('src', animals[index].img);
    OBJ_IMG[i].setAttribute('alt', animals[index].name);
    OBJ_IMG[i].setAttribute('id', index);
    OBJ_TITLE[i].innerText = animals[index].name;
    index === 1 ? OBJ_IMG[i].classList.add('card_sophia') : OBJ_IMG[i].classList.remove('card_sophia');
    i++;
    if (i >= 3) break;
  }
}

//add random pets on cards slider
numerCards();
addCardCenter(countCards);
addCardLeft(countCards);
addCardRight(countCards);

//slider, buttons event
LEFT_BTN.addEventListener('click', goLeft);
RIGHT_BTN.addEventListener('click', goRight);

SLIDER.addEventListener('animationend', () => {
  let cardPosition = document.querySelectorAll('.card__container');

  if (left) {
    SLIDER.classList.remove('slider__wraper_animation-right');
    cardPosition[0].before(cardPosition[2]);
    addCardLeft(countCards);
  } else {
    SLIDER.classList.remove('slider__wraper_animation-left');
    cardPosition[2].after(cardPosition[0]);
    addCardRight(countCards);
  }

  LEFT_BTN.addEventListener('click', goLeft);//add event after animation
  RIGHT_BTN.addEventListener('click', goRight);//add event after animation
});

//отслеживание медиазапросов
media1220.addEventListener('change', function (event) {
  event.matches ? countCards = 2 : countCards = 3;
  addCardCenter(countCards);
  addCardLeft(countCards);
  addCardRight(countCards);
});

media767.addEventListener('change', function (event) {
  event.matches ? countCards = 1 : countCards = 2;
  addCardCenter(countCards);
  addCardLeft(countCards);
  addCardRight(countCards);
});

////////////////////////////////////

const slider = document.body.querySelector('.pets-main__slider__container');
slider.addEventListener('click', (event) => {
  let card = event.target.closest('.card');
  if (!card) return;
  modal(card.firstElementChild.firstElementChild.getAttribute('id'));
});

function modal(petIndex) {
  document.body.insertAdjacentHTML("afterbegin", 
  `<div class="modal" id="modal-card">
    <div class="modal__pets">
      <div class="closed__btn"></div>
      <div class="modal__picture">
        <img src="${animals[petIndex].imgModal}" alt="${animals[petIndex].name}" class="modal__img">
      </div>
      <div class="modal__title">
        <h3 class="text_h3">${animals[petIndex].name}</h3>
        <h4 class="text_h4">${animals[petIndex].type} - ${animals[petIndex].breed}</h4>
        <h5>${animals[petIndex].description}</h5>
        <ul class="modal__text">
          <li><h5><strong>Age:</strong> ${animals[petIndex].age}</h5></li>
          <li><h5><strong>Inoculations:</strong> ${animals[petIndex].inoculations}</h5></li>
          <li><h5><strong>Diseases:</strong> ${animals[petIndex].diseases}</h5></li>
          <li><h5><strong>Parasites:</strong> ${animals[petIndex].parasites}</h5></li>
        </ul>
      </div>
    </div>
  </div>`
  );


  let modal = document.getElementById('modal-card');
  let top = document.documentElement.scrollTop; //top overflow position
  let width = window.innerWidth;
  let scroll = width - document.body.clientWidth;
  modal.style.top = `${top}px`;
  modal.style.width = `calc(100% - ${scroll}px)`;

  modal.classList.add('modal_vicible');
  document.body.classList.add('overflow');
  document.body.style.paddingRight = `${scroll}px`;

  //closed modal-pets
  modal.addEventListener('click', (event) => {
    let target = event.target;
    if (target.id == 'modal-card' || target.className == 'closed__btn') {
      modal.classList.remove('modal_vicible');
      setTimeout(() => {
        //modal.style.bottom = '100%';
        //modal.style.top = '';
        modal.remove();
        document.body.style.paddingRight = ``;
        document.body.classList.remove('overflow');
      }, 500);//for transition
    }
  });


  console.log(petIndex);
}

