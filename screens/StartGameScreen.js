import React, { useState, useEffect } from 'react';
import {
  Alert,
  Keyboard,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumContainer from '../components/NumContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
  const [enteredNum, setEnteredNum] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNum, setSelectedNum] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );

  function numInputHandler(val) {
    setEnteredNum(val.replace(/[^0-9]/g, ''));
  }

  useEffect(() => {
    function updateLayout() {
      setButtonWidth(Dimensions.get('window').width / 4);
    }
    Dimensions.addEventListener('change', updateLayout);
    return (cleanUp = () => {
      Dimensions.removeEventListener('change', updateLayout);
    });
  });

  function resetInputHandler() {
    setEnteredNum('');
    setConfirmed(false);
  }

  function confirmInputHandler() {
    const chosenNum = parseInt(enteredNum);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert('Invalid number!', 'Num has to be betweeb 1 and 99', [
        {
          text: 'Okay',
          style: 'destructive',
          onPress: resetInputHandler
        }
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNum(chosenNum);
    setEnteredNum('');
    Keyboard.dismiss();
  }

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.outputContainer}>
        <Text style={styles.numberSize}> You selected </Text>
        <NumContainer>{selectedNum}</NumContainer>
        <MainButton onPress={() => props.onStart(selectedNum)}>
          Start a game
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={50}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new game </TitleText>
            <Card style={styles.inputContainer}>
              <BodyText> Select a number </BodyText>
              <Input
                style={styles.input}
                autoCapitilize='none'
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={numInputHandler}
                value={enteredNum}
              />
              <View style={styles.btnContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='Reset'
                    onPress={resetInputHandler}
                    color={Colors.secondary}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='Confirm'
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  /*   button: {
    width: Dimensions.get('window').width / 4
  }, */
  input: {
    width: 50,
    fontSize: 18,
    textAlign: 'center'
  },
  numberSize: {
    fontSize: 16
  },
  outputText: {
    fontSize: 18,
    marginVertical: 5
  },
  outputContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  title: {
    margin: 20,
    fontSize: 18
  }
});

export default StartGameScreen;
