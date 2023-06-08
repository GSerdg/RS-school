import { NewsAppViewData, SourcesAppViewData } from '../../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  getSources(callback: (arg0: SourcesAppViewData) => void) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback as () => void
    );
  }

  getNews(e: MouseEvent, callback: (arg0: NewsAppViewData) => void) {
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
                endpoint: 'everything',
                options: {
                  sources: sourceId,
                },
              },
              callback as () => void
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
