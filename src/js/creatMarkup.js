import Notiflix from 'notiflix';
import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';

export function creatMarkup({ hits }) {
  const markup = hits
    .map(
      ({
        downloads,
        comments,
        views,
        likes,
        tags,
        webformatURL,
        largeImageURL,
      }) => `
        <a class="gallery__item" href="${largeImageURL}">
            <li class="photo-card">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes: </b>
                        ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views:</b>
                        ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments:</b>
                        ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads:</b>
                        ${downloads}
                    </p>
                </div>
            </li>
        </a>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
  scrollZoom: false,
});
