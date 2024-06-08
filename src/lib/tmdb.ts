import axios from 'axios';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchUpcomingMovies = async (region: string, startDate: string, accessToken: string) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/discover/movie`,
    params: {
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: '1',
      'primary_release_date.gte': startDate,
      'primary_release_date.lte': new Date(new Date().setMonth(new Date(startDate).getMonth() + 1)).toISOString().split('T')[0],
      sort_by: 'primary_release_date.asc',
      region: region,
      api_key: API_KEY,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};
