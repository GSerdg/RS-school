console.log('1. Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n2. Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n 3. Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n4. Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n5. Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n6. Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n7. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n8. Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n9. При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\nОткрытие меню при клике на иконку бургер-меню на текущем этапе не проверяется\n10. Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8')

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
  