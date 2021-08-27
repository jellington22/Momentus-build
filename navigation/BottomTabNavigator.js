/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SessionsScreen from '../screens/SessionsScreen';
import SessionScreen from '../screens/SessionScreen';
import SetScreen from '../screens/SetScreen';
import SessionExerciseScreen from '../screens/SessionExerciseScreen';
import SettingsScreen from '../screens/SettingsScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Sessions"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Sessions"
        component={TabOneNavigator}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="SessionsScreen"
        component={SessionsScreen}
        options={{ headerTitle: 'Momentus' }}
      />
      <TabOneStack.Screen
        name="SessionScreen"
        component={SessionScreen}
        options={{ headerTitle: 'Momentus' }}
      />
      <TabOneStack.Screen
        name="SetScreen"
        component={SetScreen}
        options={{ headerTitle: 'Momentus' }}
      />
      <TabOneStack.Screen
        name="SessionExerciseScreen"
        component={SessionExerciseScreen}
        options={{ headerTitle: 'Momentus' }}
      />
    </TabOneStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Momentus' }}
      />
    </SettingsStack.Navigator>
  );
}
