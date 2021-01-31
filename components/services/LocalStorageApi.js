const photos = "photos";
const photosFilter = "photosFilter";

export default class LocalStorageApi {
  static setPhotos(data) {
    localStorage.setItem(photos, JSON.stringify(data));
  }

  static getPhotos() {
    return JSON.parse(localStorage.getItem(photos));
  }

  static setPhotosFilter(filter) {
    localStorage.setItem(photosFilter, filter);
  }

  static getPhotosFilter() {
    return localStorage.getItem(photosFilter);
  }
}
