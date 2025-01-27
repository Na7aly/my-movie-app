import AsyncStorage from '@react-native-async-storage/async-storage';

const MOVIES_KEY = 'savedMovies';

export const saveMovie = async (movie) => {
  const savedMovies = JSON.parse(await AsyncStorage.getItem(MOVIES_KEY)) || [];
  const updatedMovies = [...savedMovies, movie];
  await AsyncStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
};

export const getSavedMovies = async () => {
  return JSON.parse(await AsyncStorage.getItem(MOVIES_KEY)) || [];
};

export const removeMovie = async (movieId) => {
  const savedMovies = JSON.parse(await AsyncStorage.getItem(MOVIES_KEY)) || [];
  const updatedMovies = savedMovies.filter((movie) => movie.imdbID !== movieId);
  await AsyncStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
};
