console.log('1. Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n2. Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n 3. Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n4. Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n5. Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n6. Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n7. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n8. Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n9. При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\nОткрытие меню при клике на иконку бургер-меню на текущем этапе не проверяется\n10. Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8')

//////Burger start///////

//for open and closed burger menu
function openClosed() {
  let navMenu = document.querySelector('.header__nav');
  let burger = document.querySelector('.burger');
  let modal = document.querySelector('.modal_burger');
  let height = document.documentElement.clientHeight;
  let width = window.innerWidth;
  let top = document.documentElement.scrollTop; //top overflow position

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
  }
}
//////Burger end///////
//////Slider start////////

const SLIDER = document.querySelector('.slider__wraper');
const LEFT_BTN = document.querySelector('#btn-left');
const RIGHT_BTN = document.querySelector('#btn-right');
let left;

function goLeft() {
  left = true;
  SLIDER.classList.add('slider__wraper_animation-left');
  LEFT_BTN.removeEventListener('click', goLeft);//remoove event on animation time
  RIGHT_BTN.removeEventListener('click', goRight);//remoove event on animation time
}

function goRight() {
  left = false;
  SLIDER.classList.add('slider__wraper_animation-right');
  RIGHT_BTN.removeEventListener('click', goRight);//remoove event on animation time
  LEFT_BTN.removeEventListener('click', goLeft);//remoove event on animation time
}

LEFT_BTN.addEventListener('click', goLeft);
RIGHT_BTN.addEventListener('click', goRight);

SLIDER.addEventListener('animationend', () => {
  let cardPosition = document.querySelectorAll('.card__container');

  if (left) {
    SLIDER.classList.remove('slider__wraper_animation-left');
    cardPosition[2].after(cardPosition[0]);
  } else {
    SLIDER.classList.remove('slider__wraper_animation-right');
    cardPosition[0].before(cardPosition[2]);
  }

  LEFT_BTN.addEventListener('click', goLeft);//add event after animation
  RIGHT_BTN.addEventListener('click', goRight);//add event after animation
});


//////Slider end////////

//////Animals generation start////////


let random = [0, 1, 2, 3, 4, 5, 6, 7];
let centerPictures = [];
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
    parasites: []
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
    parasites: []
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
    parasites: []
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
    parasites: []
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
    parasites: []
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
    parasites: []
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
    parasites: []
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
    parasites: ["lice", "fleas"]
  }
];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/////for add random pets in pets card/////
function insertCards() {
  let cardContainerWidth = document.querySelector('.card__container').offsetWidth;
  let num;//number of cards in card__container
  cardContainerWidth === 990 ? num = 3 : cardContainerWidth === 580 ? num = 2 : num = 1;

  let cardContainer = document.querySelectorAll('.card__container');
  let objImg = cardContainer[1].querySelectorAll('.card__img');
  let objTitle = cardContainer[1].querySelectorAll('.card_title');
  for (let i = 0; i < num; i++) {
    centerPictures.push(random.pop());
  }

  for (let i = 0; i < num; i++) {
    objImg[i].setAttribute('src', animals[centerPictures[i]].img);
    objImg[i].setAttribute('alt', animals[centerPictures[i]].name);
    objTitle[i].innerHTML = animals[centerPictures[i]].name;
    if (centerPictures[i] === 1) {
      objImg[i].classList.add('card_sophia');
    }
  }
}



shuffle(random);
insertCards();
console.log(random);


//////Animals generation start////////
