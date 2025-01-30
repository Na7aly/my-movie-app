import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { fetchMovies, fetchMovieDetails } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieDetailsModal from '../components/MovieDetailsModal';

const MainScreen = () => {
  const [movieQueue, setMovieQueue] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [swipeAnim] = useState(new Animated.Value(0));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [myList, setMyList] = useState([]); 

  const getRecommendedMovies = async () => {
    try {
      const data = await fetchMovies('Avengers Endgame');
      if (data && data.length > 0) {
        setMovieQueue(prevQueue => [...prevQueue, ...data]); 
      } else {
        console.log('No movies found.');
      }
    } catch (error) {
      console.error('Error fetching recommended movies:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveMovieToList = async (movie) => {
    try {
      let savedMovies = await AsyncStorage.getItem('myList');
      savedMovies = savedMovies ? JSON.parse(savedMovies) : [];
      const exists = savedMovies.some((item) => item.imdbID === movie.imdbID);
      if (exists) {
        alert('This movie is already in your list!');
        return;
      }

      savedMovies.push(movie);
      await AsyncStorage.setItem('myList', JSON.stringify(savedMovies));

      setMyList(savedMovies);

      alert('Movie successfully added to your list!');
    } catch (error) {
      console.error('Error saving movie:', error.message);
    }
  };

  
  const openMovieDetails = async (movie) => {
    try {
      const movieDetails = await fetchMovieDetails(movie.imdbID);
      if (movieDetails) {
        setSelectedMovie(movieDetails);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error.message);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };


  const handleSwipe = (gestureState) => {
    if (gestureState.dx > 50 || gestureState.dx < -50) {
      Animated.timing(swipeAnim, {
        toValue: gestureState.dx > 0 ? 500 : -500,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setMovieQueue(prevQueue => {
         
          return prevQueue.slice(1);
        });
        swipeAnim.setValue(0);
        if (movieQueue.length < 2) {
          getRecommendedMovies(); 
        }
      });
    }
  };

 
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
    onPanResponderRelease: (_, gestureState) => handleSwipe(gestureState),
  });

  useEffect(() => {
    getRecommendedMovies();
   
    const loadMyList = async () => {
      const savedMovies = await AsyncStorage.getItem('myList');
      const parsedMovies = savedMovies ? JSON.parse(savedMovies) : [];
      setMyList(parsedMovies);
    };
    loadMyList();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipe & Watch</Text>

      {movieQueue.length > 0 && (
        <Animated.View
          style={[styles.movieContainer, { transform: [{ translateX: swipeAnim }] }]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity onPress={() => openMovieDetails(movieQueue[0])}>
            <Image source={{ uri: movieQueue[0].Poster }} style={styles.poster} />
            <Text style={styles.movieTitle}>{movieQueue[0].Title}</Text>
          </TouchableOpacity>

          <Text style={styles.movieYear}>{movieQueue[0].Year}</Text>

          <TouchableOpacity style={styles.button} onPress={() => saveMovieToList(movieQueue[0])}>
            <Text style={styles.buttonText}>Add to List</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <MovieDetailsModal
        visible={isModalVisible}
        movie={selectedMovie}
        onClose={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F2F1EF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF6700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  movieContainer: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginTop: 60,
  },
  poster: {
    width: 330,
    height: 430,
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  movieYear: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6700',
    padding: 15,
    borderRadius: 30,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MainScreen;
