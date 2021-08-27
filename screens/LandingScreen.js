import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Button
          title='Sign in'
          onPress={() => navigation.navigate('Momentus')}
        />
      </View>
      <View>
        <Button
          title='Sign up'
          onPress={() => navigation.navigate('Sign Up')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
