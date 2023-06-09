import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { findNotNullElement } from '../../types/index';

class App {
  private readonly controller: AppController;
  private readonly view: AppView;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    findNotNullElement(document.body, '.sources').addEventListener('click', (e) =>
      this.controller.getNews(e, (data) => {
        this.view.drawNews(data);
      })
    );
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
