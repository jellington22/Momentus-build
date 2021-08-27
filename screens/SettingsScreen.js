import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import Colors from '../constants/Colors';

export default function SettingsScreen() {
  const { authActions } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity onPress={() => authActions.signOut()}>
        <Text lightColor={Colors.light.tint}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
