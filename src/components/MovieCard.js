import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Correct the image path
const defaultImage = require('../../assets/icon.png'); // Update path accordingly

const MovieCard = ({ movie }) => (
  <View style={styles.card}>
    <Image
      source={movie.Poster ? { uri: movie.Poster } : defaultImage} // Use movie poster or default image
      style={styles.poster}
    />
    <Text style={styles.title}>{movie.Title}</Text>
    <Text style={styles.year}>{movie.Year}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { marginBottom: 15, alignItems: 'center' },
  poster: { width: 120, height: 180, borderRadius: 5 },
  title: { fontWeight: 'bold', marginTop: 5 },
  year: { color: 'gray' },
});

export default MovieCard;



// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const MovieCard = ({ movie }) => (
//   <View style={styles.card}>
//     {/* Poți elimina complet secțiunea Image */}
//     <Text style={styles.title}>{movie.Title}</Text>
//     <Text style={styles.year}>{movie.Year}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   card: { marginBottom: 15, alignItems: 'center' },
//   title: { fontWeight: 'bold', marginTop: 5 },
//   year: { color: 'gray' },
// });

// export default MovieCard;
