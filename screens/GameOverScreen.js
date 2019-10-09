import React from 'react';
import {
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView
} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
      <ScrollView>
        <View style={styles.screen}>
          <TitleText> Game Over </TitleText>
          <View style={styles.imgContainer}>
            <Image
              resizeMode='cover'
              style={styles.image}
              source={require('../assets/success.png')}
              //source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
            />
          </View>
          <BodyText style={styles.resultText}>
            Your phone needed{' '}
            <Text style={styles.highlight}> {props.roundsNum} </Text> rounds to
            guess the number{' '}
            <Text style={styles.highlight}> {props.roundsNum} </Text>{' '}
          </BodyText>
          <MainButton onPress={props.onRestart}>Start a new game</MainButton>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  imgContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: Colors.primary,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 18
  }
});

export default GameOverScreen;
