import { refs } from './js/refs';
import { PixabayAPI } from './js/pixabayAPI';
import { creatMarkup } from './js/creatMarkup';
import Notiflix from 'notiflix';
import { observer } from './js/observer';

refs.form.addEventListener('submit', onSearch);

export const pixabayAPI = new PixabayAPI();

function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.searchQuery.value.trim();

  if (!searchQuery) {
    Notiflix.Notify.info('Enter data to search, please!');
    return;
  }

  refs.gallery.innerHTML = '';
  pixabayAPI.resetPage();

  pixabayAPI.queru = searchQuery;
  pixabayAPI
    .getPhotos()
    .then(data => {
      creatMarkup(data);

      if (data.totalHits !== 0) {
        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      }

      pixabayAPI.setTotalPhotos(data.totalHits);
      const hasMore = pixabayAPI.hasMorePhotos();
      if (hasMore) {
        const item = document.querySelector('.photo-card:last-child');
        observer.observe(item);
      }
    })
    .catch(error => console.log(error));

  refs.form.reset();
}
