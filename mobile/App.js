import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import MapScreen from './src/screens/MapScreen';
import ReportForm from './src/components/ReportForm';
import AlertHistory from './src/components/AlertHistory';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>SIMAI Angola</Text>
        <MapScreen />
        <ReportForm />
        <View style={styles.card}>
          <Text style={styles.subtitle}>Botão de emergência</Text>
          <Button title="Enviar localização de emergência" onPress={() => {}} color="#c1121f" />
        </View>
        <AlertHistory />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  title: { fontSize: 26, fontWeight: '700', margin: 16 },
  subtitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  card: { backgroundColor: 'white', margin: 16, padding: 16, borderRadius: 12 }
});
