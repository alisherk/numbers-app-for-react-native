import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors'; 
import TitleText from '../components/TitleText';

const Header = props => (
  <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}> 
    <TitleText style={styles.textStyle}> {props.title} </TitleText>
  </View>
);

const styles = StyleSheet.create({
     headerBase: {
         width: '100%', 
         height: 120,
         paddingTop: 36, 
         justifyContent: 'center', 
         alignItems: 'center', 
     },
     headerIOS: {
      backgroundColor: 'white',
      borderBottomColor: '#ccc', 
      borderBottomWidth: 1,
     }, 
     headerAndroid: {
      backgroundColor: Colors.primary,
     },
     textStyle: {
       fontSize: 20, 
       color: Platform.OS === 'ios' ? Colors.primary: 'white',
     }
});

export default Header;
