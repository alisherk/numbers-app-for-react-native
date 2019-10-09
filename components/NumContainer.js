import React from 'react';
import Colors from '../constants/colors';
import { View, Text, StyleSheet } from 'react-native';

const NumContainer = props => {
  return (
      <View style={styles.container}>
        <Text style={styles.number}> {props.children} </Text>
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  number: {
    color: Colors.secondary,
    fontSize: 22
  }, 
  staticText: {
      fontSize: 16
  }
});

export default NumContainer;
