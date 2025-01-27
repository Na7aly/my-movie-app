import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChange, onSubmit }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search movies..."
      value={value}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default SearchBar;
