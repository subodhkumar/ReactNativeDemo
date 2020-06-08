import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';



const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ListPage} options={{title: 'Home'}}></Stack.Screen>
        <Stack.Screen name="Detail" component={DetailPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// http://pkr5vcnw9rj0.cloud.wavemakeronline.com/PEOPLE/services/people/people?size=10&page=1
// http://pkr5vcnw9rj0.cloud.wavemakeronline.com/PEOPLE/services/people/personById?pid=2
// http://pkr5vcnw9rj0.cloud.wavemakeronline.com/PEOPLE/#/Main