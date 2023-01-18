import { pixabayAPI } from '..';
import { creatMarkup } from './creatMarkup';

const options = {
  root: null,
  rootMargin: '100px',
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
            const item = document.querySelector('.photo-card:last-child');
            observer.observe(item);
          }
        })
        .catch(error => console.log(error));
    }
  });
};

export const observer = new IntersectionObserver(callback, options);
