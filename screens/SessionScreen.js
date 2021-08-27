import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import Colors from '../constants/Colors';
import { AuthContext } from '../contexts/AuthContext';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import theme from '../theme';

export default function SessionScreen({ navigation, route }) {
  const { sessionId } = route.params;
  const db = firebase.firestore();

  const [sessionExercises, setSessionExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const querySnapshot =
        await db.collection('sessionExercises')
          .where('sessionId', '==', sessionId)
          .get();
      const arr = querySnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          exerciseName: data.exerciseName,
        };
      });

      setSessionExercises(arr);
    });

    return unsubscribe;
  }, [navigation]);

  async function createSessionExerciseAndNavigate() {
    let name;
    let id;

    // Figure out if we have this exercise yet
    const exerciseSnapshot =
      await db.collection('exercises')
        .where('name', '==', exerciseName)
        .limit(1)
        .get();
    let exercise = exerciseSnapshot.docs[0];

    if (!exercise) {
      // If we don't have an exercise with this name yet, create one
      exercise = await db.collection('exercises').add({
        name: exerciseName,
        userId: authState.loggedInUser.uid,
        created: Date.now(),
      });

      console.log("Exercise written with ID: ", exercise.id);
    }

    name = exerciseName;
    id = exercise.id;

    // Figure out if we've done this exercise in this session yet
    const sessionExerciseSnapshot =
      await db.collection('sessionExercises')
        .where('exerciseId', '==', id)
        .where('sessionId', '==', sessionId)
        .limit(1)
        .get();
    let sessionExercise = sessionExerciseSnapshot.docs[0];

    if (!sessionExercise) {
      // If we haven't, create a session exercise
      sessionExercise = await db.collection('sessionExercises').add({
        exerciseName,
        exerciseId: id,
        sessionId,
        userId: authState.loggedInUser.uid,
        created: Date.now(),
      });

      console.log("Session exercise written with ID: ", sessionExercise.id);
    }

    navigation.navigate('SessionExerciseScreen', { sessionExerciseId: sessionExercise.id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <TextInput
          style={styles.input}
          placeholder="Exercise"
          onChangeText={exercise => setExerciseName(exercise)}
          defaultValue={exerciseName}
        />
        <Button mt={2} onPress={createSessionExerciseAndNavigate}>
          <Text>
            Add Exercise
          </Text>
        </Button>
      </View>
      <View style={styles.separator} color="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        {sessionExercises.map(sessionExercise => {
          return (
            <View key={sessionExercise.id}>
              <Button onPress={() => navigation.navigate('SessionExerciseScreen', { sessionExerciseId: sessionExercise.id })}>
                <Text>
                  {sessionExercise.exerciseName}
                </Text>
              </Button>
            </View>
          )
        })}
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
