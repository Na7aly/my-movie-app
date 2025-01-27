import React from 'react';
import { View, Text, Image, Button, StyleSheet, Modal } from 'react-native';

const MovieDetailsModal = ({ visible, movie, onClose }) => {
  if (!movie) return null; 

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: movie.Poster }} style={styles.modalImage} />
          <Text style={styles.modalTitle}>{movie.Title}</Text>
          <Text style={styles.modalDetails}>Year: {movie.Year}</Text>
          <Text style={styles.modalDetails}>Genre: {movie.Genre}</Text>
          <Text style={styles.modalDetails}>Director: {movie.Director}</Text>
          <Text style={styles.modalDetails}>Actors: {movie.Actors}</Text>
          <Text style={styles.modalDetails}>Runtime: {movie.Runtime}</Text>
          <Text style={styles.modalDetails}>IMDb Rating: {movie.imdbRating}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MovieDetailsModal;
