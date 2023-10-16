import axios from 'axios';

const key = '39970397-b319560db17234a71cde66e6b';
const BaseURL = 'https://pixabay.com/api/';

export default class PXService {
    constructor() {
        this.search = '';
        this.page = 1;
        this.per_page = 40;
        this.totalHits = 0;
    }

    async fetchImages() {
        console.log('до запроса: ', this);
        const URL = `${BaseURL}?key=${key}&q=${this.search}&per_page=${this.per_page}&page=${this.page}`;

        try {
            const response = await axios.get(URL);
            this.incrementPage();
            this.totalHits = response.data.totalHits;
            return response.data.hits;
        } catch (error) {
            console.error(error);
            throw error;
        }
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