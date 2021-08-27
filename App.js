import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@emotion/react';
import * as Sentry from 'sentry-expo';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import theme from './theme';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { getItem } from './storage';
import SignInScreen from './screens/SignInScreen';
import SignupScreen from './screens/SignupScreen';
import LandingScreen from './screens/LandingScreen';

// Initialize Sentry
Sentry.init({
  dsn: 'https://f2c5b7a8ca4b4ed68c613342ab22de52@o643687.ingest.sentry.io/5758123',
  enableInExpoDevelopment: true,
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAFKX3QUdDMf_ZoU_qUFyaX4vkCEm6K0nw',
  authDomain: 'momentus-36f43.firebaseapp.com',
  projectId: 'momentus-36f43',
  storageBucket: 'momentus-36f43.appspot.com',
  messagingSenderId: '1089379103749',
  appId: '1:1089379103749:web:394ea65e5ba7654e17586c',
  measurementId: 'G-91B9GT5WSS',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const Stack = createStackNavigator();

  function AppShell() {
    const { authState, authActions } = React.useContext(AuthContext);

    React.useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
        let loggedInUser;

        try {
          loggedInUser = await getItem('loggedInUser');
        } catch (e) {
          // Restoring token failed
        }

        // After restoring token, we may need to validate it in production apps

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        authActions.restoreLoggedInUser(JSON.parse(loggedInUser));
      };

      bootstrapAsync();
    }, []);

    if (authState.isAuthLoading) return null;

    return (
      <>
        {authState.loggedInUser == null ? (
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Landing Screen'>
              <Stack.Screen name='Landing Screen' component={LandingScreen} />
              <Stack.Screen name='Momentus' component={SignInScreen} />
              <Stack.Screen name='Sign Up' component={SignupScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
          <>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </>
        )}
      </>
    );
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <AppShell />
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    );
  }
}
