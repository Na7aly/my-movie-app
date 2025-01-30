import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './src/screens/MainScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import MyList from './src/screens/MyList';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Explore') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'MyList') {
              iconName = focused ? 'list' : 'list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF6700',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#122334',
            borderTopWidth: 1,
            borderTopColor: '#FF6700',
            height: 75,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#122334',
            borderBottomWidth: 1,
            borderBottomColor: '#FF6700',
          },
          headerTintColor: '#fc842d',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        })}
      >
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerTitle: '',
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            headerTitle: '',
          }}
        />
        <Tab.Screen
          name="MyList"
          component={MyList}
          options={{
            headerTitle: '',
            tabBarOnPress: ({ navigation }) => {
              navigation.navigate('MyList', { refresh: true });
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
