import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const riskAreas = [
  { municipality: 'Luanda', risk: 'vermelho' },
  { municipality: 'Benguela', risk: 'amarelo' },
  { municipality: 'Huambo', risk: 'verde' }
];

export default function MapScreen() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Mapa de risco (MVP)</Text>
      <Text>• Localização do utilizador + zonas de risco por cor.</Text>
      {riskAreas.map((area) => (
        <Text key={area.municipality}>
          {area.municipality}: {area.risk}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', margin: 16, padding: 16, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 }
});
