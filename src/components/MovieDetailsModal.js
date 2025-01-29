import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';

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
          
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Year: <Text style={styles.value}>{movie.Year || 'N/A'}</Text></Text>
            <Text style={styles.label}>Genre: <Text style={styles.value}>{movie.Genre || 'N/A'}</Text></Text>
            <Text style={styles.label}>Director: <Text style={styles.value}>{movie.Director || 'N/A'}</Text></Text>
            <Text style={styles.label}>Actors: <Text style={styles.value}>{movie.Actors || 'N/A'}</Text></Text>
            <Text style={styles.label}>Runtime: <Text style={styles.value}>{movie.Runtime || 'N/A'}</Text></Text>
            <Text style={styles.label}>IMDb Rating: <Text style={styles.value}>{movie.imdbRating || 'N/A'}</Text></Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
    width: 250,
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoContainer: {
    alignSelf: 'flex-start',
    marginLeft:30, 
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold', 
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'normal', 
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF6700', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieDetailsModal;
