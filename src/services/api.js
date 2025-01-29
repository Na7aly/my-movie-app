import axios from 'axios';
import { API_KEY, API_HOST, API_URL } from '@env';

export const fetchMovies = async (searchTerm, page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: {
        s: searchTerm,
        r: 'json',
        page,
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
    });

    if (!response.data || !response.data.Search) {
      throw new Error('No movies found for this search term.');
    }

    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
};

export const fetchTopMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: {
        s: 'popular',
        r: 'json',
        page: 1,
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
    });

    if (!response.data || !response.data.Search) {
      throw new Error('No popular movies found.');
    }

    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching top movies:', error.message);
    throw error;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: {
        s: 'trending',
        r: 'json',
        page: 1,
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
    });

    if (!response.data || !response.data.Search) {
      throw new Error('No trending movies found.');
    }

    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    throw error;
  }
};

export const searchMoviesByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: {
        t: title,
        r: 'json',
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
    });

    if (!response.data) {
      throw new Error('No movie found with this title.');
    }

    return response.data || {};
  } catch (error) {
    console.error('Error searching for movie:', error.message);
    throw error;
  }
};

export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: {
        i: imdbID,
        r: 'json',
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
    });

    if (!response.data) {
      throw new Error('No details found for this movie.');
    }

    return response.data || {};
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    throw error;
  }
};
