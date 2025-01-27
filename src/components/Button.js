import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fc842d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: { color: 'white', fontWeight: 'bold' },
});

export default Button;
