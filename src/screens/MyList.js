import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieDetailsModal from '../components/MovieDetailsModal'; 
import { fetchMovieDetails } from '../services/api'; 


const MyList = () => {
  const [myList, setMyList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getMyList = async () => {
    try {
      const savedMovies = await AsyncStorage.getItem('myList');
      setMyList(savedMovies ? JSON.parse(savedMovies) : []);
    } catch (error) {
      console.error('Error getting the movie list:', error.message);
    }
  };

  useEffect(() => {
    getMyList();
  }, []);

  const removeMovieFromList = async (movie) => {
    try {
      const updatedList = myList.filter((item) => item.imdbID !== movie.imdbID);
      await AsyncStorage.setItem('myList', JSON.stringify(updatedList));
      setMyList(updatedList);
      alert('Movie removed from your list!');
    } catch (error) {
      console.error('Error removing the movie:', error.message);
    }
  };

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
      <Text style={styles.title}>My List</Text>
      <FlatList
        data={myList}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openMovieDetails(item)}>
            <View style={styles.movieItem}>
              <Image source={{ uri: item.Poster }} style={styles.movieImage} />
              <View style={styles.textContainer}>
                <Text style={styles.movieTitle}>{item.Title}</Text>
                <TouchableOpacity onPress={() => removeMovieFromList(item)}>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  movieImage: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
  },
  removeText: {
    color: 'red',
    fontSize: 16,
  },
});

export default MyList;
