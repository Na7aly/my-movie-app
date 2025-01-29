import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MovieCard from '../components/MovieCard';
import { fetchTopMovies, fetchTrendingMovies, searchMoviesByTitle } from '../services/api';
import MovieDetailsModal from '../components/MovieDetailsModal'; 

const ExploreScreen = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedMovie, setSelectedMovie] = useState(null); 

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const top = await fetchTopMovies();
      const trending = await fetchTrendingMovies();
      setTopMovies(top);
      setTrendingMovies(trending);
    } catch (error) {
      console.error('Error fetching movies:', error.message);
    }
  };

  const handleSearch = async () => {
    if (search.trim() === '') return;
    try {
      const result = await searchMoviesByTitle(search);
      setSearchResults(result ? [result] : []);
    } catch (error) {
      console.error('Error searching:', error.message);
    }
  };

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie); 
    setModalVisible(true); 
  };

  const handleCloseModal = () => {
    setModalVisible(false); 
    setSelectedMovie(null); 
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Search for a movie..."
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          {searchResults.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Search Results</Text>
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.imdbID}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleMoviePress(item)}>
                    <MovieCard movie={item} />
                  </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Top Movies</Text>
              <FlatList
                data={topMovies}
                keyExtractor={(item) => item.imdbID}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleMoviePress(item)}>
                    <MovieCard movie={item} />
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Trending Movies</Text>
              <FlatList
                data={trendingMovies}
                keyExtractor={(item) => item.imdbID}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleMoviePress(item)}>
                    <MovieCard movie={item} />
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </>
      }
      keyExtractor={(item) => item.imdbID}
      ListFooterComponent={<MovieDetailsModal visible={modalVisible} movie={selectedMovie} onClose={handleCloseModal} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#FF6700',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginLeft: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    margin: 0,
    textAlign: 'center',
    marginTop: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default ExploreScreen;
