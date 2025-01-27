import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { fetchMovies } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const MainScreen = () => {
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swipeAnim] = useState(new Animated.Value(0)); 
  const navigation = useNavigation();

  
  const getRecommendedMovie = async () => {
    try {
      const data = await fetchMovies('Avengers Endgame'); 
      if (data && data.length > 0) {
        const randomMovie = data[Math.floor(Math.random() * data.length)];
        setRecommendedMovie(randomMovie);
      } else {
        console.log('No movies found');
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
      alert('Movie added to your list!');
      navigation.navigate('MyList');
    } catch (error) {
      console.error('Error saving movie:', error.message);
    }
  };

  useEffect(() => {
    getRecommendedMovie();
  }, []);

  
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {

        Animated.timing(swipeAnim, {
          toValue: 500, 
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setRecommendedMovie(null);
          swipeAnim.setValue(0);
          getRecommendedMovie();
        });
      } else if (gestureState.dx < -50) {
      
        Animated.timing(swipeAnim, {
          toValue: -500, 
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
      <Text style={styles.title}>Recommended Movie</Text>
      {recommendedMovie && (
        <Animated.View
          style={[styles.movieContainer, { transform: [{ translateX: swipeAnim }] }]}
          {...panResponder.panHandlers}
        >
          <Image source={{ uri: recommendedMovie.Poster }} style={styles.poster} />
          <Text style={styles.movieTitle}>{recommendedMovie.Title}</Text>
          <Text style={styles.movieYear}>{recommendedMovie.Year}</Text>

          <TouchableOpacity style={styles.button} onPress={() => saveMovieToList(recommendedMovie)}>
            <Text style={styles.buttonText}>Watch</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieContainer: {
    alignItems: 'center',
    width: '100%',
  },
  poster: {
    width: 250,
    height: 375,
    marginVertical: 20,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieYear: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fc842d',
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MainScreen;
