

const key = '39970397-b319560db17234a71cde66e6b';
const BaseURL = 'https://pixabay.com/api/';
const options = {
    headers: {
      Autorization: '39970397-b319560db17234a71cde66e6b',
    },
  };

export default class PXService {
    constructor() {
        this.search = '';
        this.page = 1;
        this.per_page = 40;
        this.totalHits = 0;
        
        

    }
    

fetchImages() {
    console.log('до запроса: ', this);
    
      
      const URL = `${BaseURL}?key=${key}&q=${this.search}&per_page=${this.per_page}&page=${this.page}`;
    
      return fetch(URL)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.incrementPage();
        // console.log('после запроса если все ок: ', this)
        this.totalHits = data.totalHits;
        return data.hits
      });
      
}

incrementPage() {
    this.page += 1;
}

resetPage() {
    this.page = 1;
}

get searchQuery() {
    return this.search;
}
set searchQuery(newSearchQuery) {
    this.search = newSearchQuery;
}
}

