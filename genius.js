

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';

const GRID_SIZE = 3;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const COLORS = {
  default: '#1a1a1a',
  success: '#4CAF50', // verde mais claro
  error: '#ff4d4d',
  flash: '#facc15',
  square: '#3f3f46',
  text: '#f1f5f9',
  button: '#2563eb',
};

const LEVELS = {
  easy: { speed: 1000 },
  medium: { speed: 700 },
  hard: { speed: 500 },
};

export default function App() {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [flashing, setFlashing] = useState(null);
  const [level, setLevel] = useState('easy');
  const [playing, setPlaying] = useState(false);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(COLORS.default);

  useEffect(() => {
    if (playing) startGame();
  }, [playing]);

  useEffect(() => {
    if (playing) startGame();
  }, [level]);

  const startGame = () => {
    resetBackground();
    const firstStep = getRandomIndex();
    setSequence([firstStep]);
    setUserInput([]);
    playSequence([firstStep]);
  };

  const playSequence = async (seq) => {
    setIsPlayingSequence(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setFlashing(seq[i]);
          setTimeout(() => setFlashing(null), LEVELS[level].speed / 2);
          resolve();
        }, i * LEVELS[level].speed);
      });
    }
    setTimeout(() => setIsPlayingSequence(false), 100);
  };

  const handlePress = (index) => {
    if (!playing || isPlayingSequence) return;

    const newInput = [...userInput, index];
    setUserInput(newInput);

    const isCorrect = newInput[newInput.length - 1] === sequence[newInput.length - 1];

    if (!isCorrect) {
      setBackgroundColor(COLORS.error);
      setTimeout(startGame, 1000);
      return;
    }

    if (newInput.length === sequence.length) {
      setBackgroundColor(COLORS.success);
      setTimeout(addStep, 1000);
    }
  };

  const addStep = () => {
    resetBackground();
    const nextStep = getRandomIndex();
    const updatedSequence = [...sequence, nextStep];
    setSequence(updatedSequence);
    setUserInput([]);
    playSequence(updatedSequence);
  };

  const getRandomIndex = () => Math.floor(Math.random() * TOTAL_CELLS);
  const resetBackground = () => setBackgroundColor(COLORS.default);

  const toggleLevel = () => {
    const next = level === 'easy' ? 'medium' : level === 'medium' ? 'hard' : 'easy';
    setLevel(next);
    setPlaying(true); // Reinicia o jogo ao trocar de nível
  };

  const handleStartPress = () => {
    Alert.alert(
      'Iniciar Jogo',
      'Deseja reiniciar o jogo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Reiniciar', onPress: () => setPlaying(true) },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>  
      <View style={styles.container}>
        <Text style={styles.title}>Jogo Gênios</Text>

        <View style={styles.grid}>
          {Array.from({ length: TOTAL_CELLS }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.square, flashing === index && styles.active]}
              onPress={() => handlePress(index)}
              disabled={isPlayingSequence}
            />
          ))}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleStartPress}>
            <Text style={styles.buttonText}>🎮 Iniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={toggleLevel}>
            <Text style={styles.buttonText}>⚙️ Dificuldade: {level}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 198,
    height: 198,
    justifyContent: 'center',
    marginBottom: 30,
  },
  square: {
    width: 60,
    height: 60,
    margin: 3,
    backgroundColor: COLORS.square,
    borderRadius: 10,
  },
  active: {
    backgroundColor: COLORS.flash,
  },
  buttons: {
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    backgroundColor: COLORS.button,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
});
