import './news.css';
import { NewsApiData } from '../../../types/index';

class News {
  private findNotNullElement(node: HTMLElement, selector: string) {
    const element = node.querySelector<HTMLElement>(selector);
    if (element !== null) return element;
    throw new Error();
  }

  draw(data: NewsApiData[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
    const fragment = document.createDocumentFragment();
    const newsItemTemp = this.findNotNullElement(document.body, '#newsItemTemp') as HTMLTemplateElement;

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
      if (idx % 2) {
        this.findNotNullElement(newsClone, '.news__item').classList.add('alt');
      }
      this.findNotNullElement(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
        item.urlToImage || 'img/news_placeholder.jpg'
      })`;
      this.findNotNullElement(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
      this.findNotNullElement(newsClone, '.news__meta-date').textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      this.findNotNullElement(newsClone, '.news__description-title').textContent = item.title;
      this.findNotNullElement(newsClone, '.news__description-source').textContent = item.source.name;
      this.findNotNullElement(newsClone, '.news__description-content').textContent = item.description;
      this.findNotNullElement(newsClone, '.news__read-more a').setAttribute('href', item.url);

      fragment.append(newsClone);
    });
    const elementNews = this.findNotNullElement(document.body, '.news');
    elementNews.innerHTML = '';
    elementNews.appendChild(fragment);
  }
}

export default News;
