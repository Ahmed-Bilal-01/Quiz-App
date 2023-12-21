import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuizCategoryScreen from '../screens/QuizCategoryScreen';
import QuizScreen from '../screens/quiz-screen/QuizScreen';
import ResultScreen from '../screens/ResultScreen';


const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
    initialRouteName="QuizCategoryScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="QuizCategoryScreen" component={QuizCategoryScreen} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
