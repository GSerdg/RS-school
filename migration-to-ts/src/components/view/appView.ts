import { NewsData, NewsAppViewData, SourcesData, SourcesAppViewData } from '../../types/index';
import { findDomElement } from '../../helper/find-dom-element';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  private readonly news: { draw(data: NewsData[]): void };
  private readonly sources: { draw(data: SourcesData[]): void };
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: NewsAppViewData) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
    const sources = findDomElement<HTMLElement>(document.body, '.sources');
    sources.classList.add('sources_height');
  }

  public drawSources(data: SourcesAppViewData) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
