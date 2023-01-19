import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com';
  #KEY = '32887815-95ef90331530c7572123f2036';
  #query = '';
  #page = 1;
  #per_page = 40;
  #totalPhotos = 0;

  async getPhotos() {
    try {
      const response = await axios.get(
        `${this.#BASE_URL}/api/?key=${this.#KEY}&q=${
          this.#query
        }&image_type=photo&orientation=horizontal&safesearch=true&page=${
          this.#page
        }&per_page=${this.#per_page}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  get queru() {
    return this.#query;
  }

  set queru(newQuery) {
    this.#query = newQuery;
  }

  hasMorePhotos() {
    return this.#page < Math.ceil(this.#totalPhotos / this.#per_page);
  }

  setTotalPhotos(total) {
    this.#totalPhotos = total;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }
}
