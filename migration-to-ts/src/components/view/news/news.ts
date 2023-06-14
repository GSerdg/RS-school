import './news.css';
import { NewsApiData } from '../../../types/index';
import { findDomElement } from '../../../helper/find-dom-element';

class News {
  draw(data: Readonly<NewsApiData[]>) {
    const dataTitleSet: Set<string> = new Set();
    let i = 0;
    const news: NewsApiData[] = [];
    while (dataTitleSet.size < 10) {
      if (!data[i]) break;
      dataTitleSet.add(data[i].title);
      i += 1;
    }
    data.forEach((item) => {
      if (dataTitleSet.has(item.title)) {
        news.push(item);
        dataTitleSet.delete(item.title);
      }
    });

    const fragment = document.createDocumentFragment();
    const newsItemTemp = findDomElement<HTMLTemplateElement>(document.body, '#newsItemTemp');

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
      if (idx % 2) {
        findDomElement<HTMLElement>(newsClone, '.news__item').classList.add('alt');
      }
      findDomElement<HTMLElement>(newsClone, '.news__meta-photo').style.backgroundImage = `url(${item.urlToImage})`;
      findDomElement<HTMLElement>(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
      findDomElement<HTMLElement>(newsClone, '.news__meta-date').textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      findDomElement<HTMLElement>(newsClone, '.news__description-title').textContent = item.title;
      findDomElement<HTMLElement>(newsClone, '.news__description-source').textContent = item.source.name;
      findDomElement<HTMLElement>(newsClone, '.news__description-content').textContent = item.description;
      findDomElement<HTMLElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);

      fragment.append(newsClone);
    });
    const elementNews = findDomElement<HTMLElement>(document.body, '.news');
    elementNews.innerHTML = '';
    elementNews.appendChild(fragment);
  }
}

export default News;
