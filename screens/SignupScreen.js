import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';
import TextInput from '../components/TextInput';

export default function SignupScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { authActions } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View>
        <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title='Sign up'
          onPress={() => authActions.signUp({ email, password })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
