import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';
const API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
const END_POINT = '/search/photos';

export function getPhotos(query, page) {
  return  axios.get(`${BASE_URL}${END_POINT}`, {
        params: {
          query,
          page,
          per_page: 12,
          client_id: API_KEY
        },
      });
}




