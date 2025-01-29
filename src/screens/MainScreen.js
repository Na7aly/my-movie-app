import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { fetchMovies } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieDetailsModal from '../components/MovieDetailsModal';

const MainScreen = () => {
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swipeAnim] = useState(new Animated.Value(0)); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getRecommendedMovie = async () => {
    try {
      const data = await fetchMovies('Avengers Endgame'); 
      if (data && data.length > 0) {
        const randomMovie = data[Math.floor(Math.random() * data.length)];
        setRecommendedMovie(randomMovie);
      } else {
        console.log('No movies found.');
      }
    } catch (error) {
      console.error('Error fetching recommended movie:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveMovieToList = async (movie) => {
    try {
      let myList = await AsyncStorage.getItem('myList');
      myList = myList ? JSON.parse(myList) : [];
      myList.push(movie);
      await AsyncStorage.setItem('myList', JSON.stringify(myList));
      alert('Movie successfully added to your list!');
    } catch (error) {
      console.error('Error saving movie:', error.message);
    }
  };

  const openModal = (movie) => {
    setRecommendedMovie(movie);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getRecommendedMovie();
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50 || gestureState.dx < -50) {
        Animated.timing(swipeAnim, {
          toValue: gestureState.dx > 0 ? 500 : -500,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setRecommendedMovie(null);
          swipeAnim.setValue(0);
          getRecommendedMovie();
        });
      }
    },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Swipe & Watch</Text>

      {recommendedMovie && (
        <Animated.View
          style={[styles.movieContainer, { transform: [{ translateX: swipeAnim }] }]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity onPress={() => openModal(recommendedMovie)}>
            <Image source={{ uri: recommendedMovie.Poster }} style={styles.poster} />
            <Text style={styles.movieTitle}>{recommendedMovie.Title}</Text>
          </TouchableOpacity>

          <Text style={styles.movieYear}>{recommendedMovie.Year}</Text>

          <TouchableOpacity style={styles.button} onPress={() => saveMovieToList(recommendedMovie)}>
            <Text style={styles.buttonText}>Add to List</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <MovieDetailsModal
        visible={isModalVisible}
        movie={recommendedMovie}
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
