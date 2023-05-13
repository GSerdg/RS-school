import '../#source/scss/base/_base.scss';
import createHeader from './components/header/header';
import createMainWindow from './components/main/main';
// import { feelMines } from './modules/feelMinesField';
// import createElement from './modules/createElement';

document.body.append(createHeader());
document.body.append(createMainWindow());
// document.body.append(createElement('main', ['main']));
// console.log(createHeader());
// const minesMatrix = feelMines(10, 10, 10);
