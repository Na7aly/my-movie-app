import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './src/screens/MainScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import MyList from './src/screens/MyList';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Main" component={MainScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="My List" component={MyList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
