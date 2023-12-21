import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import QuizScreen from './src/screens/quiz-screen/QuizScreen';
import RootStack from './src/routes/RootStack';
import ResultScreen from './src/screens/ResultScreen';

const App = () => {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
        <NavigationContainer >
          <RootStack />
        </NavigationContainer>
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

export default App;
