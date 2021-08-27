import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import firebase from 'firebase';

import Colors from '../constants/Colors';
import { AuthContext } from '../contexts/AuthContext';
import Button from '../components/Button';

export default function SessionsScreen({ navigation }) {
  const db = firebase.firestore();

  const [sessions, setSessions] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const querySnapshot =
        await db.collection('sessions')
          .where('userId', '==', authState.loggedInUser.uid)
          .get();
      const arr = querySnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          created: data.created,
        };
      });

      setSessions(arr);
    });

    return unsubscribe;
  }, [navigation]);

  async function createSessionAndNavigate() {
    const docRef = await db.collection('sessions').add({
      created: Date.now(),
      userId: authState.loggedInUser.uid,
    });

    console.log("Session written with ID: ", docRef.id);

    navigation.navigate('SessionScreen', { sessionId: docRef.id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sessions</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <TouchableOpacity marginTop="500px" onPress={createSessionAndNavigate}>
          <Text lightColor={Colors.light.tint}>
            New Session
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        {sessions.map(session => {
          return (
            <View key={session.id}>
              {/* <TouchableOpacity>
                <Text>{session.created}</Text>
              </TouchableOpacity> */}
              <Button onPress={() => navigation.navigate('SessionScreen', { sessionId: session.id })}>
                <Text>{new Date(session.created).toLocaleString()}</Text>
              </Button>
            </View>
          )
        })}
      </View>
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
