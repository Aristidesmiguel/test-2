import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const mockAlerts = [
  { id: '1', date: '2026-04-20', level: 'alto', message: 'Cheias no Cazenga' },
  { id: '2', date: '2026-04-18', level: 'medio', message: 'Chuva intensa em Benguela' }
];

export default function AlertHistory() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Histórico de alertas</Text>
      {mockAlerts.map((alert) => (
        <Text key={alert.id}>{alert.date} - {alert.level.toUpperCase()} - {alert.message}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', margin: 16, padding: 16, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 }
});
