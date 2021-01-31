const baseURL = "https://jsonplaceholder.typicode.com";

class PlaceholderApi {
  async getPhotos() {
    let response = await fetch(`${baseURL}/photos?_limit=400`);
    response = await response.json();
    return response;
  }
}

export default new PlaceholderApi();
