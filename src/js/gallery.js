import { getPhotos } from './unsplash-api';

const formEl = document.querySelector('.js-search-form');
const ulEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

formEl.addEventListener('submit', onSubmit);

let page = 1;

async function onSubmit(event) {
  event.preventDefault();
  const searchQuerry = event.target.elements['user-search-query'].value;
  //   console.log(searchQuerry);
  try {
    const {
      data: { results, total },
    } = await getPhotos(searchQuerry, page);
    // console.log(results);
    if (results.length === 0) {
      return alert(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    ulEl.innerHTML = createMarkup(results);
  } catch (error) {}
}

function createMarkup(arr) {
  return arr
    .map(
      item => `<li class='gallery__item'>
    <img src='${item.urls.small}' alt='${item.alt_description}' class='gallery-img' />
</li>`
    )
    .join('');
}
