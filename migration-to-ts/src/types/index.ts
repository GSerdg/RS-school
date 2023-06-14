interface SourceData {
  id: string;
  name: string;
}

interface AppViewData {
  status: string;
  totalResults: number;
  articles: NewsApiData[];
  sources: SourcesApiData[];
}

interface ApiData {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
  author: string;
  content: string;
  publishedAt: string;
  source: SourceData;
  title: string;
  urlToImage: string;
}

export type NewsApiData = Pick<
  ApiData,
  'description' | 'url' | 'author' | 'content' | 'publishedAt' | 'source' | 'title' | 'urlToImage'
>;
export type SourcesApiData = Pick<ApiData, 'id' | 'name' | 'description' | 'url' | 'category' | 'language' | 'country'>;

export type ApiKeyData<T> = {
  [apiKey in string]: T;
};

export type NewsAppViewData = Pick<AppViewData, 'status' | 'totalResults' | 'articles'>;
export type SourcesAppViewData = Pick<AppViewData, 'status' | 'sources'>;

export enum Endpoint {
  Sources = 'sources',
  Everything = 'everything',
}

export enum CodeStatus {
  Unauthorized = 401,
  NotFound = 404,
}
