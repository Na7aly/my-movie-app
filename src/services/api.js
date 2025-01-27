
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
    return response.data.Search || [];
  } catch (error) {
    console.error('Eroare la obținerea filmelor:', error.message);
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
    return response.data.Search || [];
  } catch (error) {
    console.error('Eroare la obținerea Top Movies:', error.message);
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
    return response.data.Search || [];
  } catch (error) {
    console.error('Eroare la obținerea Trending Movies:', error.message);
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
    return response.data || {};
  } catch (error) {
    console.error('Eroare la căutarea filmului:', error.message);
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
    return response.data || {};
  } catch (error) {
    console.error('Eroare la obținerea detaliilor filmului:', error.message);
    throw error;
  }
};


