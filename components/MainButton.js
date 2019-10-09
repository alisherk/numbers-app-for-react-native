import React from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/colors';

const MainButton = props => {

  let ButtonComp = TouchableOpacity; 

  if(Platform.OS === 'android' && Platform.Version >=21){
    ButtonComp = TouchableNativeFeedback
  }

  return (
    <View style={styles.btnContainer}> 
    <ButtonComp activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.btnText}>{props.children}</Text>
      </View>
    </ButtonComp>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 25, 
    overflow: 'hidden', 

  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20
  },
  btnText: {
    color: 'white',
    fontFamily: 'open-sans-reg',
    fontSize: 18
  }
});

export default MainButton;
