import { getPhotos } from './unsplash-api';
import Notiflix from 'notiflix';
import { formEl, ulEl, loadMoreBtnEl } from './refs';
import { createMarkup } from './create-markup';

formEl.addEventListener('submit', onSubmit);
loadMoreBtnEl.addEventListener("click", onLoadMoreBtnClick)

let page = 1;
let querry = null;

async function onSubmit(event) {
  event.preventDefault();
  loadMoreBtnEl.classList.add("is-hidden")
  page = 1;
  querry = event.target.elements['user-search-query'].value;
  try {
    const {
      data: { results, total },
    } = await getPhotos(querry, page);
    if (results.length === 0) {
      ulEl.innerHTML = "";
      return Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      
    }
    ulEl.innerHTML = createMarkup(results);

    
    Notiflix.Notify.success(`Hooray! We found ${total} images.`);

    if(total > 12) {
      loadMoreBtnEl.classList.remove("is-hidden")
    }
  } catch (error) {
    Notiflix.Notify.failure('Opps! Something is wrong!');
  } finally {
    event.target.reset()
  }
}

async function onLoadMoreBtnClick() {
  page += 1;
  try {
    const {
      data: { results, total_pages },
    } = await getPhotos(querry, page);
   
    ulEl.insertAdjacentHTML("beforeend", createMarkup(results))

    if(total_pages === page) {
      loadMoreBtnEl.classList.add("is-hidden")
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    Notiflix.Notify.failure('Opps! Something is wrong!');
  }
}