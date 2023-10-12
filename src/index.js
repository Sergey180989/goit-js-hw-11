import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import PXService from './app';
// import createMarkUp from './Markup';
const key = '39970397-b319560db17234a71cde66e6b';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]')
};
refs.loadMoreBtn.style.display = 'none';
const pxService = new PXService(40);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);



function createMarkUp(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => ` 
    
      <div class="photo-card">
      <a href="${largeImageURL}" data-lightbox="gallery">
        <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>`
    )
    .join('');
}

function onSearch(e) {
  e.preventDefault();
  clearhitsMarkup();
  pxService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (pxService.searchQuery === '') {
    refs.loadMoreBtn.style.display = 'none';
    Notify.failure(
      "Sorry, there are no images matching your search query. Please try again."
    );
  } else {
    refs.loadMoreBtn.style.display = 'none';
    pxService.resetPage();
    pxService.fetchImages().then((hits) => {
        appendhitsMarkup(hits);
        if (pxService.totalHits > 0) {
          Notify.info(`Hooray! We found ${pxService.totalHits} images.`);
        } else {
          Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
      });
  }
}



function onLoadMore() {
  pxService.fetchImages().then(appendhitsMarkup);
}

function appendhitsMarkup(hits) {
    
  refs.gallery.insertAdjacentHTML('beforeend', createMarkUp(hits));
  if (pxService.page * pxService.per_page >= pxService.totalHits) {
    
    Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtn.style.display = 'none';
  } else {
    refs.loadMoreBtn.style.display = 'block';
  }
  
  const {height: cardHeight} = refs.gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 1,
    behavior: "smooth",
  });
  const gallery = new SimpleLightbox('[data-lightbox="gallery"]');
  gallery.refresh();
}
function clearhitsMarkup() {
  refs.gallery.innerHTML = '';
}
