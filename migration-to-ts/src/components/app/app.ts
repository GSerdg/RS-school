import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NotNullElement } from '../../types/index';

class App extends NotNullElement {
  controller: AppController;
  view: AppView;
  constructor() {
    super();
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    this.findNotNullElement(document.body, '.sources').addEventListener('click', (e) =>
      this.controller.getNews(e, (data) => {
        this.view.drawNews(data);
      })
    );
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
