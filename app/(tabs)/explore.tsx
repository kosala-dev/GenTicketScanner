import { Linking, StyleSheet, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const openWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=94713033099');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      
      {/* Main  */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
            textAlign: 'center',
          }}>
          Welcome to EventSync
        </ThemedText>
      </ThemedView>
      
      {/* Centered Subtitle */}
      <ThemedText style={styles.subtitle}>
        Join with us today to organise your event
      </ThemedText>

      {/* About  */}
      <ThemedView style={styles.aboutCard}>
        <ThemedText type="subtitle">About EventSync</ThemedText>
        <ThemedText style={styles.aboutText}>
          EventSync is your ultimate platform for managing, verifying, and organizing events seamlessly. 
          Built with modern technology to ensure fast and secure entry for all your attendees.
        </ThemedText>
      </ThemedView>

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <TouchableOpacity onPress={openWhatsApp} style={styles.contactButton}>
          <ThemedText style={styles.contactText}>
            Contact us today on WhatsApp: 
          </ThemedText>
          <ThemedText style={styles.whatsappNumber}>
            +94 71 303 3099
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.copyrightText}>
          © 2026 kosala-dev. All rights reserved.
        </ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 30,
  },
  aboutCard: {
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
  },
  aboutText: {
    marginTop: 10,
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.2)',
    gap: 20,
  },
  contactButton: {
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
  },
  whatsappNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25D366', 
    marginTop: 5,
  },
  copyrightText: {
    fontSize: 12,
    opacity: 0.5,
  },
});