import { CameraView, useCameraPermissions } from 'expo-camera';
import Constants from 'expo-constants';
import { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';

const API_URL = Constants.expoConfig?.extra?.API_URL ?? 'https://113b-103-247-51-232.ngrok-free.app';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>EventSync needs camera access to scan tickets.</Text>
        <Button onPress={requestPermission} title="Grant Camera Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setIsVerifying(true);

    let cleanHash = data.trim();

    if (cleanHash.includes('ticket_hash=')) {
      cleanHash = cleanHash.split('ticket_hash=')[1];
      
      cleanHash = cleanHash.split('&')[0]; 
    }

    try {
      const response = await fetch(`${API_URL}/api/ticket-scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticket_hash: cleanHash })
      });

      const result = await response.json();

      if (response.status === 200) {
        Alert.alert("✅ Verified", "Ticket scanned successfully", [{ text: "Next", onPress: resetScanner }]);
      } else if (response.status === 409) {
        Alert.alert("⚠️ Already Scanned", "This ticket has already been used", [{ text: "Next", onPress: resetScanner }]);
      } else if (response.status === 404) {
        Alert.alert("❌ Invalid", "Ticket not found in database", [{ text: "Retry", onPress: resetScanner }]);
      } else {
        Alert.alert("⚠️ Error", result.error || "Invalid Request", [{ text: "Retry", onPress: resetScanner }]);
      }

    } catch (error) {
      Alert.alert("⚠️ Network Error", "Could not reach the server.", [{ text: "OK", onPress: resetScanner }]);
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setIsVerifying(false);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      
      <View style={styles.overlay}>
        <Text style={styles.title}>Eventsync QR Scanner</Text>
        {isVerifying ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#00FF00" />
            <Text style={styles.loadingText}>Verifying...</Text>
          </View>
        ) : (
          <View style={styles.scanTarget} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 20,
    color: 'white',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    color: '#00FF00',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  scanTarget: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  loadingBox: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
  },
  loadingText: {
    color: '#00FF00',
    marginTop: 15,
    fontWeight: 'bold',
  }
});