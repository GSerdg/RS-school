import { NewsApiData, NewsAppViewData, SourcesApiData, SourcesAppViewData } from '../../types/index';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  private news: { draw(data: NewsApiData[]): void };
  private sources: { draw(data: SourcesApiData[]): void };
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: NewsAppViewData) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: SourcesAppViewData) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
