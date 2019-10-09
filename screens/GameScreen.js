import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import NumContainer from '../components/NumContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import DefaultStyle from '../constants/default-styles';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';
import { ScreenOrientation } from 'expo';

function genRandomNum(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return genRandomNum(min, max, exclude);
  } else {
    return rndNum;
  }
}

function renderList(listLength, itemData) {
  return (
    <View style={styles.listItem}>
      <BodyText> #{listLength - itemData.index} </BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
}

const GameScreen = props => {
  const initialGuess = genRandomNum(1, 100, props.userChoice);
  const [guess, setGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [avdeviceHeight, setAvdeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const curLow = useRef(1);
  const curHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    function updateLayout() {
      setAvdeviceHeight(Dimensions.get('window').height);
    }
    Dimensions.addEventListener('change', updateLayout);
    return (cleanUp = () => {
      Dimensions.removeEventListener('change', updateLayout);
    });
  });

  useEffect(() => {
    if (guess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [guess, userChoice, onGameOver]);

  function nextGuessHandler(dir) {
    if (
      (dir === 'lower' && guess < userChoice) ||
      (dir === 'higher' && guess > userChoice)
    ) {
      Alert.alert("Don't lie", 'You know this is wrong', [
        { text: 'Sorry', styles: 'cancel' }
      ]);
      return;
    }
    dir === 'lower' ? (curHigh.current = guess) : (curLow.current = guess + 1);
    const nextNum = genRandomNum(curLow.current, curHigh.current, guess);
    setGuess(nextNum);
    setPastGuesses(curPastGuesses => [nextNum.toString(), ...curPastGuesses]);
  }

  if (avdeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyle.title}> Computer guess: </Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumContainer> {guess} </NumContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>

        <View style={styles.listContainer}>
          {/*       <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((newGuess, index) =>
            renderList(newGuess, pastGuesses.length - index)
          )}
        </ScrollView> */}
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderList.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyle.title}> Computer guess: </Text>
      <NumContainer> {guess} </NumContainer>
      <Card style={styles.btnContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/*       <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((newGuess, index) =>
            renderList(newGuess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderList.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 350,
    maxWidth: '90%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  listContainer: {
    width: Dimensions.get('window').width > 600 ? '70%' : '90%',
    flex: 1
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  }
});

export default GameScreen;
