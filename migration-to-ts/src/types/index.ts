interface SourceData {
  id: string;
  name: string;
}

interface AppViewData {
  status: string;
  totalResults: number;
  articles: NewsData[];
  sources: SourcesData[];
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

export interface GetRespType {
  endpoint: Endpoint;
  options?: Partial<{ sources: string }>;
}

export type NewsData = Pick<
  ApiData,
  'description' | 'url' | 'author' | 'content' | 'publishedAt' | 'source' | 'title' | 'urlToImage'
>;
export type SourcesData = Pick<ApiData, 'id' | 'name' | 'description' | 'url' | 'category' | 'language' | 'country'>;

export type ApiKeyData = {
  [apiKey in string]: string;
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

export type Callback<T> = (data: T) => void;
