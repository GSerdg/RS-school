import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'b5b55592024f49b0a4c0bd22ee4637e9', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
