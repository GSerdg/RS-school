import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { findDomElement } from '../../helper/find-dom-element';

function hideMenuButtons(event: MouseEvent) {
  const target = event.target as HTMLDivElement;
  const button = target.closest('.hidden-button');

  if (!button) return;

  const element = button.previousElementSibling as HTMLElement | null;
  if (element !== null) {
    if (Array.from(element.classList).includes('sources_height')) {
      element.classList.remove('sources_height');
    } else {
      element.classList.add('sources_height');
    }
  }
}

class App {
  private readonly controller: AppController;
  private readonly view: AppView;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    findDomElement<HTMLElement>(document.body, '.sources').addEventListener('click', (e) =>
      this.controller.getNews(e, (data) => {
        this.view.drawNews(data);
      })
    );
    findDomElement<HTMLElement>(document.body, '.hidden-button').addEventListener('click', hideMenuButtons);

    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
