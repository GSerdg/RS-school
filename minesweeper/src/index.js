import '../#source/scss/base/_base.scss';
import createHeader from './components/header/header';
import createMainWindow from './components/main/main';
// import createElement from './modules/createElement';

document.body.append(createHeader());
document.body.append(createMainWindow());
// document.body.append(createElement('main', ['main']));
console.log(createHeader());
