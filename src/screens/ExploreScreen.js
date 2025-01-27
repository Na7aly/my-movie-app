import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MovieCard from '../components/MovieCard'; 
import { fetchTopMovies, fetchTrendingMovies, searchMoviesByTitle } from '../services/api'; 


const ExploreScreen = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
      console.error('Eroare la obținerea filmelor:', error.message);
    }
  };

  const handleSearch = async () => {
    if (search.trim() === '') return;
    try {
      const result = await searchMoviesByTitle(search);
      setSearchResults(result ? [result] : []); 
    } catch (error) {
      console.error('Eroare la căutare:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Caută un film..."
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

     
      {searchResults.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rezultatele căutării</Text>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => <MovieCard movie={item} />}
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
            renderItem={({ item }) => <MovieCard movie={item} />}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Trending Movies</Text>
          <FlatList
            data={trendingMovies}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
              <View style={styles.trendingCard}>
                <MovieCard movie={item} />
                <Text style={styles.movieYear}>{item.Year}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
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
    marginBottom: 20,
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
    backgroundColor: '#fc842d',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  trendingCard: {
    marginBottom: 10,
    alignItems: 'center',
  },
  movieYear: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
});

export default ExploreScreen;