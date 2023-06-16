import { ApiKeyData, Callback, GetRespType, NewsAppViewData, SourcesAppViewData } from '../../types/index';
import { CodeStatus } from '../../types/index';

class Loader {
  private readonly baseLink: string;
  private readonly options: ApiKeyData;

  constructor(baseLink: string, options: ApiKeyData) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: GetRespType,
    callback: Callback<NewsAppViewData> | Callback<SourcesAppViewData> = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === CodeStatus.Unauthorized || res.status === CodeStatus.NotFound) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: ApiKeyData, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load(
    method: string,
    endpoint: string,
    callback: Callback<NewsAppViewData> | Callback<SourcesAppViewData>,
    options = {}
  ) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
