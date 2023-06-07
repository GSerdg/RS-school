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
