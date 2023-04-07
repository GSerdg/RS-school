console.log('1. Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n2. Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n 3. Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n4. Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n5. Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n6. Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n7. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n8. Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n9. При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\nОткрытие меню при клике на иконку бургер-меню на текущем этапе не проверяется\n10. Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8')

let animals = [
  {
    name: "Jennifer",
    img: "../../assets/images/pets/jennifer.png",
    type: "Dog",
    breed: "Labrador",
    description: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: "2 months",
    inoculations: [],
    diseases: [],
    parasites: [],
    formatClass: ""
  },
  {
    name: "Sophia",
    img: "../../assets/images/pets/sophia.png",
    type: "Dog",
    breed: "Shih tzu",
    description: "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: "1 month",
    inoculations: ["parvovirus"],
    diseases: [],
    parasites: [],
    formatClass: "card_sophia"
  },
  {
    name: "Woody",
    img: "../../assets/images/pets/woody.png",
    type: "Dog",
    breed: "Golden Retriever",
    description: "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    age: "3 years 6 months",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["right back leg mobility reduced"],
    parasites: [],
    formatClass: ""
  },
  {
    name: "Scarlett",
    img: "../../assets/images/pets/scarlett.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description: "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    age: "3 months",
    inoculations: ["parainfluenza"],
    diseases: [],
    parasites: [],
    formatClass: ""
  },
  {
    name: "Katrine",
    img: "../../assets/images/pets/katrine.png",
    type: "Cat",
    breed: "British Shorthair",
    description: "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    age: "6 months",
    inoculations: ["panleukopenia"],
    diseases: [],
    parasites: [],
    formatClass: ""
  },
  {
    name: "Timmy",
    img: "../../assets/images/pets/timmy.png",
    type: "Cat",
    breed: "British Shorthair",
    description: "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    age: "2 years 3 months",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
    diseases: ["kidney stones"],
    parasites: [],
    formatClass: ""
  },
  {
    name: "Freddie",
    img: "../../assets/images/pets/freddie.png",
    type: "Cat",
    breed: "British Shorthair",
    description: "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    age: "2 months",
    inoculations: ["rabies"],
    diseases: [],
    parasites: [],
    formatClass: ""
  },
  {
    name: "Charly",
    img: "../../assets/images/pets/charly.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description: "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    age: "8 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["deafness", "blindness"],
    parasites: ["lice", "fleas"],
    formatClass: ""
  }
];
let animalsPagination = [];
const media969 = window.matchMedia('(max-width: 969px)');
const media639 = window.matchMedia('(max-width: 639px)');
const PGN_PAGE = document.getElementById('pgn-center');
const PGN_RIGHT = document.getElementById('pgn-right');
const PGN_LEFT = document.getElementById('pgn-left');
const PGN_ALL_RIGHT = document.getElementById('pgn-all-right');
const PGN_ALL_LEFT = document.getElementById('pgn-all-left');
let numPage = 1;
let num;//Количество карточек для отображения на странице
//for open and closed burger menu

function openClosed() {
  let navMenu = document.querySelector('.header__nav');
  let burger = document.querySelector('.burger');
  let modal = document.querySelector('.modal_burger');
  let height = document.documentElement.clientHeight;
  let width = window.innerWidth;
  let top = document.documentElement.scrollTop; //top overflow position
  let scroll = width - document.body.clientWidth;

  if (navMenu.classList.contains('header__nav_visible')) {
    setTimeout(() => {
      navMenu.style.height = '';
      navMenu.style.top = '';
      modal.style.top = '';
    }, 500);//for transition burger menu

    navMenu.classList.remove('header__nav_visible');
    burger.classList.remove('burger_rotate');
    modal.classList.remove('modal_vicible');
    document.body.classList.remove('overflow');

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

//Случайно перемешивает элементы в массиве
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

//Заполняет, доступные к заполнению карточки
function fillPagination() {
  const width = window.innerWidth;
  const petsContainer = document.body.querySelector(".pets__container");
  const petsImg = petsContainer.querySelectorAll(".card__img");
  const petsTitle = petsContainer.querySelectorAll(".card_title");

  if (width > 969) {
    num = 8
  }
  if (width <= 969 && width > 639) {
    num = 6
  }
  if (width <= 639) {
    num = 3
  }
  let cardIndex = num * (numPage - 1);
  for (let i = 0; i < num; i++) {
    petsImg[i].setAttribute('src', animalsPagination[cardIndex].img);
    petsImg[i].setAttribute('alt', animalsPagination[cardIndex].name);
    petsTitle[i].innerText = animalsPagination[cardIndex].name;
    petsImg[i].className = `card__img ${animalsPagination[cardIndex].formatClass}`
    cardIndex++;
  }
}

//Кнопки пагинации
function pgnRight() {
  PGN_PAGE.firstElementChild.innerText = ++numPage;
  PGN_LEFT.classList.remove('pagination-btn_inactiv');
  PGN_ALL_LEFT.classList.remove('pagination-btn_inactiv');
  if (numPage === 48 / num) {
    PGN_RIGHT.classList.add('pagination-btn_inactiv');
    PGN_ALL_RIGHT.classList.add('pagination-btn_inactiv');
  }
  fillPagination();
}
function pgnAllRight() {
  num === 8 ? numPage = 6 : num === 6 ? numPage = 8 : numPage = 16;
  PGN_PAGE.firstElementChild.innerText = numPage;
  PGN_RIGHT.classList.add('pagination-btn_inactiv');
  PGN_ALL_RIGHT.classList.add('pagination-btn_inactiv');
  PGN_LEFT.classList.remove('pagination-btn_inactiv');
  PGN_ALL_LEFT.classList.remove('pagination-btn_inactiv');
  fillPagination();
}
function pgnLeft() {
  PGN_PAGE.firstElementChild.innerText = --numPage;
  PGN_RIGHT.classList.remove('pagination-btn_inactiv');
  PGN_ALL_RIGHT.classList.remove('pagination-btn_inactiv');
  if (numPage === 1) {
    PGN_LEFT.classList.add('pagination-btn_inactiv');
    PGN_ALL_LEFT.classList.add('pagination-btn_inactiv');
  }
  fillPagination();
}
function pgnAllLeft() {
  numPage = 1;
  PGN_RIGHT.classList.remove('pagination-btn_inactiv');
  PGN_ALL_RIGHT.classList.remove('pagination-btn_inactiv');
  PGN_PAGE.firstElementChild.innerText = numPage;
  PGN_LEFT.classList.add('pagination-btn_inactiv');
  PGN_ALL_LEFT.classList.add('pagination-btn_inactiv');
  fillPagination();
}

//Формируем массив объектов из 48 животных, расположенных
//в случайном порядке с учетом разбивки по 8, 6 и 3 карточки.
let count = 0;
for (let i = 0; i < 6; i++) {
  if (i == 1 || i == 4) {
    let flag = true;
    while (flag) {
      shuffle(animals);
      flag = false;
      for (let j = 0; j < 4; j++) {
        if (animals[j] == animalsPagination[animalsPagination.length - 1] || animals[j] == animalsPagination[animalsPagination.length - 2]) {
          flag = true;
          break;
        }
      }
    }
  } else if (i == 2 || i == 5) {
    let flag = true;
    while (flag) {
      shuffle(animals);
      flag = false;
      for (let j = 0; j < 4; j++) {
        if (animals[0] == animalsPagination[animalsPagination.length - 1 - j] || animals[1] == animalsPagination[animalsPagination.length - 1 - j]) {
          flag = true;
          break;
        }
      }
    }
  } else {shuffle(animals);}

  animalsPagination = animalsPagination.concat(animals);
}

//Заполняем карточки
fillPagination();

//Ждем медиазапрос, который изменяет количество карточек на странице
media969.addEventListener('change', function (event) {
  if (!event.matches) {
    if (numPage > 6) {
      numPage = 6;
      PGN_PAGE.firstElementChild.innerText = numPage;
    }
  } else {
    PGN_RIGHT.classList.remove('pagination-btn_inactiv');
    PGN_ALL_RIGHT.classList.remove('pagination-btn_inactiv');  
  }
  fillPagination();
});

media639.addEventListener('change', function (event) {
  if (!event.matches) {
    if (numPage > 8) {
      numPage = 8;
      PGN_PAGE.firstElementChild.innerText = numPage;
    }
  } else {
    PGN_RIGHT.classList.remove('pagination-btn_inactiv');
    PGN_ALL_RIGHT.classList.remove('pagination-btn_inactiv');  
  }
  fillPagination();
});
