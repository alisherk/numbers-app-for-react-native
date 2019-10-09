import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

async function fetchFont() {
  return Font.loadAsync({
    'open-sans-reg': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [userNum, setUserNum] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataloaded, setDataLoaded] = useState(false);

  if (!dataloaded) {
    return (
      <AppLoading startAsync={fetchFont} onFinish={() => setDataLoaded(true)} onError={err => console.log(err)} />
    );
  }

  function configGameHandler() {
    setGuessRounds(0);
    setUserNum(null);
  }

  function strGameHandler(num) {
    setUserNum(num);
  }

  function gameOverHandler(rounds) {
    setGuessRounds(rounds);
  }

  let content = <StartGameScreen onStart={strGameHandler} />;

  
  if (userNum && guessRounds <= 0) {
    content = <GameScreen userChoice={userNum} onGameOver={gameOverHandler} />;
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        onRestart={configGameHandler}
        roundsNum={guessRounds}
        userNum={userNum}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={'Guess a number'} />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
