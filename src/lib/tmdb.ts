import axios from 'axios';
const ACCESS_KEY=process.env.TMDB_API_KEY

export const fetchNewMovies =  {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  params: {
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    page: '1',
    'primary_release_date.gte': '2024-06-06',
    sort_by: 'primary_release_date.asc'
  },
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_KEY}`
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });