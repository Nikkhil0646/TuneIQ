import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  BackHandler,
} from "react-native";

interface InfoOverlayProps {
  visible: boolean;
  onClose: () => void;
}

const InfoOverlay: React.FC<InfoOverlayProps> = ({ visible, onClose }) => {
  // Handle Android hardware back button to close modal
  useEffect(() => {
    const backAction = () => {
      if (visible) {
        onClose();
        return true; // prevent default behavior (exit app)
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [visible, onClose]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose} // Required for Android back button
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ScrollView>
            <Text style={styles.heading}>Circle of Fifths Guide</Text>

            <Text style={styles.label}>🎵 Root Note (Green)</Text>
            <Text style={styles.text}>
              This is the selected tonic/root of the current key.
            </Text>

            <Text style={styles.label}>🎶 Scale Notes (Colored)</Text>
            <Text style={styles.text}>
              Notes that belong to the selected key are color-coded based on pitch
              class.
            </Text>

            <Text style={styles.label}>⚪ Non-Scale Notes (Gray)</Text>
            <Text style={styles.text}>These notes are not in the current scale.</Text>

            <Text style={styles.label}>🔁 Enharmonics</Text>
            <Text style={styles.text}>
              Notes like F♯ and G♭ are enharmonically equivalent and grouped in one
              segment.
            </Text>

            <Text style={styles.label}>🔄 Major/Minor Mode</Text>
            <Text style={styles.text}>
              Switch between parallel/relative modes to explore different tonal
              centers.
            </Text>
          </ScrollView>

          <Pressable onPress={onClose} style={styles.button} android_ripple={{color: '#388E3C'}}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default InfoOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxHeight: "80%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  text: {
    fontSize: 14,
    color: "#444",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
