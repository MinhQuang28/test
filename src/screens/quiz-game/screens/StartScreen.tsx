import React, {FC} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

interface StartScreenProps {
  startGame: () => void;
}

const StartScreen: FC<StartScreenProps> = ({startGame}) => (
  <View style={styles.body}>
    <View style={styles.heading}>
      <Text style={styles.title}>Funny Quiz</Text>
    </View>

    <View>
      <TouchableHighlight style={styles.startButton} onPress={startGame}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableHighlight>
    </View>
  </View>
);

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    backgroundColor: '#141414',
    height: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading: {
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#8854c0',
    borderRadius: 8,
    minWidth: 150,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StartScreen;
