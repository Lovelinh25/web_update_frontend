import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null); // ✅ Fix here

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current); // ✅ Fix here
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  const formatTime = (seconds: number) => { // ✅ Fix here
    const hrs = Math.floor(seconds/3600);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
   return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttons}>
        <Button title={isRunning ? 'Pause' : 'Start'} onPress={isRunning ? stopTimer : startTimer} />
        <Button title="Reset" onPress={resetTimer} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timer: { fontSize: 60, marginBottom: 20 },
  buttons: { flexDirection: 'row', gap: 20 }
});
