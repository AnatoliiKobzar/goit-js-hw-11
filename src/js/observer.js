import Notiflix, { Notify } from 'notiflix';
import { pixabayAPI } from '..';
import { creatMarkup } from './creatMarkup';

const options = {
  root: null,
  rootMargin: '400px',
  threshold: 1.0,
};

const callback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target);
      observer.unobserve(entry.target);
      pixabayAPI.incrementPage();
      pixabayAPI
        .getPhotos()
        .then(data => {
          creatMarkup(data);
          const hasMore = pixabayAPI.hasMorePhotos();
          if (hasMore) {
            const item = document.querySelector('.gallery__item:last-child');
            observer.observe(item);
          } else {
            andSearch();
          }
        })
        .catch(error => console.log(error));
    }
  });
};

export const observer = new IntersectionObserver(callback, options);

export function andSearch() {
  var notify = function (entries, observerNo) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        observerNo.unobserve(item);
      }
    });
  };

  var observerNo = new IntersectionObserver(notify, options);

  const item = document.querySelector('.gallery__item:last-child');
  observerNo.observe(item);

  var options = {
    root: null,
    threshold: 1.0,
  };
}
