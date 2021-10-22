import axios from "axios";

export default class ApiService {
  constructor(URL, key) {
    this.URL = URL;
    this.key = key;
    this._searchQuery = "";
    this._page = 1;
    this._perPage = 12;
    this.orientation = "horizontal";
    this.type = "photo";
  }

  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }

  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page = value);
  }

  get perPage() {
    return this._perPage;
  }
  set perPage(value) {
    return (this._perPage = value);
  }

  resetPage() {
    return (this._page = 1);
  }

  incPageNumber() {
    this._page += 1;
  }

  async fetchImages() {
    const query = `${this.URL}?key=${this.key}&page=${this._page}&per_page=${this._perPage}
        &orientation=${this.orientation}&image_type=${this.type}&q=${this._searchQuery}`;
    try {
      const result = await axios.get(query);
      console.log("result.data :>> ", result.data);
      return result.data;
    } catch (err) {
      return err;
    }
  }
}
