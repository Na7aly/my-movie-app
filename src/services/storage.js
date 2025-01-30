import AsyncStorage from '@react-native-async-storage/async-storage';

const MOVIES_KEY = 'savedMovies';


export const saveMovie = async (movie) => {
  try {
  
    const savedMovies = JSON.parse(await AsyncStorage.getItem(MOVIES_KEY)) || [];
  
    if (savedMovies.some((item) => item.imdbID === movie.imdbID)) {
      console.log('Movie already in the list');
      return;
    }

  
    const updatedMovies = [...savedMovies, movie];

  
    await AsyncStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
    console.log('Movie saved successfully:', movie);
  } catch (error) {
    console.error('Error saving movie:', error);
  }
};


export const getSavedMovies = async () => {
  try {
  
    const savedMovies = JSON.parse(await AsyncStorage.getItem(MOVIES_KEY)) || [];
    console.log('Retrieved saved movies:', savedMovies);
    return savedMovies; 
  } catch (error) {
    console.error('Error retrieving saved movies:', error);
    return []; 
  }
};

export const removeMovie = async (movieId) => {
  try {
  
    const savedMovies = JSON.parse(await AsyncStorage.getItem(MOVIES_KEY)) || [];
    
   
    const updatedMovies = savedMovies.filter((movie) => movie.imdbID !== movieId);

   
    await AsyncStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
    console.log('Movie removed:', movieId);
  } catch (error) {
    console.error('Error removing movie:', error);
  }
};
