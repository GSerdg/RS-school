interface SourceData {
  id: string;
  name: string;
}

export interface NewsApiData {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: SourceData;
  title: string;
  url: string;
  urlToImage: string;
}

export interface NewsAppViewData {
  status: string;
  totalResults: number;
  articles: NewsApiData[];
}

export interface SourcesApiData {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface SourcesAppViewData {
  status: string;
  sources: SourcesApiData[];
}

export class NotNullElement {
  findNotNullElement(node: HTMLElement, selector: string) {
    const element = node.querySelector<HTMLElement>(selector);
    if (element !== null) return element;
    throw new Error();
  }
}
