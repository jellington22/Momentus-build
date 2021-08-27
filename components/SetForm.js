import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

import Colors from '../constants/Colors';
import { AuthContext } from '../contexts/AuthContext';
import TextInput from '../components/TextInput';

export default function SetForm({ sessionExerciseId }) {
  const navigation = useNavigation();
  const db = firebase.firestore();

  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [exertion, setExertion] = useState('');
  const [notes, setNotes] = useState('');
  const { authState } = useContext(AuthContext);

  async function submit() {
    try {
      const docRef = await db.collection('sets').add({
        sessionExerciseId,
        reps,
        weight,
        exertion,
        notes,
        userId: authState.loggedInUser.uid,
        created: Date.now(),
      });

      console.log("Set written with ID: ", docRef.id);

      navigation.navigate('SessionExerciseScreen', { sessionExerciseId });
    } catch (e) {
      console.error("Error adding exercise: ", e);
    }
  }

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Reps"
          onChangeText={reps => setReps(reps)}
          defaultValue={reps}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight"
          onChangeText={weight => setWeight(weight)}
          defaultValue={weight}
        />
        <TextInput
          style={styles.input}
          placeholder="Exertion"
          onChangeText={exertion => setExertion(exertion)}
          defaultValue={exertion}
        />
        <TextInput
          style={styles.input}
          placeholder="Notes"
          onChangeText={notes => setNotes(notes)}
          defaultValue={notes}
        />
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={submit} style={{marginTop: 16}}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
  },
});
