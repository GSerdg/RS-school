import { NewsAppViewData, SourcesAppViewData, Endpoint, Callback } from '../../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  getSources(callback: Callback<SourcesAppViewData>) {
    super.getResp(
      {
        endpoint: Endpoint.Sources,
      },
      callback
    );
  }

  getNews(e: MouseEvent, callback: Callback<NewsAppViewData>) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLDivElement;
    if (target === null || newsContainer === null) return;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (sourceId !== null) {
          if (newsContainer.getAttribute('data-source') !== sourceId) {
            newsContainer.setAttribute('data-source', sourceId);
            super.getResp(
              {
                endpoint: Endpoint.Everything,
                options: {
                  sources: sourceId,
                },
              },
              callback
            );
          }
        }
        return;
      }
      const parent = target.parentNode;
      if (parent !== null) target = parent as HTMLElement;
    }
  }
}

export default AppController;
