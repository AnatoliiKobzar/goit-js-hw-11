import { refs } from './js/refs';
import { PixabayAPI } from './js/pixabayAPI';
import { creatMarkup } from './js/creatMarkup';
import Notiflix from 'notiflix';
import { observer } from './js/observer';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { andSearch } from './js/observer';
import * as scroll from './js/btn-scroll';

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

      if (data.totalHits === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (data.totalHits !== 0) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }

      if (data.totalHits <= 40) {
        andSearch();
      }

      pixabayAPI.setTotalPhotos(data.totalHits);
      const hasMore = pixabayAPI.hasMorePhotos();
      if (hasMore) {
        const item = document.querySelector('.gallery__item:last-child');
        observer.observe(item);
      }
    })
    .catch(error => console.log(error));

  refs.form.reset();
}
