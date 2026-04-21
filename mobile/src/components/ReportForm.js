import React, { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';

export default function ReportForm() {
  const [description, setDescription] = useState('');

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Reportar inundação</Text>
      <TextInput
        placeholder="Descreva o evento"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Enviar reporte com GPS e foto" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', margin: 16, padding: 16, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8, marginBottom: 8 }
});
