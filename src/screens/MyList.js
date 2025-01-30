import React, { useState, useEffect, useCallback } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieDetailsModal from '../components/MovieDetailsModal'; 
import { fetchMovieDetails } from '../services/api'; 
import { useFocusEffect } from '@react-navigation/native'; 

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  
  const addMovieToList = async (movie) => {
    try {
      const exists = myList.some((item) => item.imdbID === movie.imdbID);
      if (exists) {
        Alert.alert('Duplicate Movie', 'This movie is already in your list!');
        return;
      }

      const updatedList = [movie, ...myList];  
      setMyList(updatedList);

      await AsyncStorage.setItem('myList', JSON.stringify(updatedList));

      Alert.alert('Success', 'Movie added to your list!');
    } catch (error) {
      console.error('Error adding the movie:', error.message);
    }
  };

  
  const removeMovieFromList = async (movie) => {
    try {
      const updatedList = myList.filter((item) => item.imdbID !== movie.imdbID);
      setMyList(updatedList);

      await AsyncStorage.setItem('myList', JSON.stringify(updatedList));

      Alert.alert('Movie Removed', 'Movie removed from your list!');
    } catch (error) {
      console.error('Error removing the movie:', error.message);
    }
  };

  const getMyList = async () => {
    try {
      const savedMovies = await AsyncStorage.getItem('myList');
      const parsedMovies = savedMovies ? JSON.parse(savedMovies) : [];
      
      const uniqueMovies = Array.from(new Set(parsedMovies.map((movie) => movie.imdbID)))
        .map((id) => parsedMovies.find((movie) => movie.imdbID === id));

      setMyList(uniqueMovies);
    } catch (error) {
      console.error('Error getting the movie list:', error.message);
    }
  };

  
  const fetchData = useCallback(() => {
    getMyList(); 
  }, []);

  
  useFocusEffect(fetchData);


  const openMovieDetails = async (movie) => {
    try {
      const movieDetails = await fetchMovieDetails(movie.imdbID);

      if (movieDetails) {
        setSelectedMovie(movieDetails);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Movie List</Text>
      <FlatList
        data={myList}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openMovieDetails(item)}>
            <View style={styles.movieItem}>
              <Image source={{ uri: item.Poster }} style={styles.movieImage} />
              <View style={styles.textContainer}>
                <Text style={styles.movieTitle}>{item.Title}</Text>
                <TouchableOpacity 
                  style={styles.removeButton} 
                  onPress={() => removeMovieFromList(item)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      {modalVisible && (
        <MovieDetailsModal
          visible={modalVisible}
          movie={selectedMovie}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F1EF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF6700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 3, 
  },
  movieItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  movieImage: {
    width: 100,
    height: 150,
    marginRight: 20,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#FF6700',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  removeText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MyList;
