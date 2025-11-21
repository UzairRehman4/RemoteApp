import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { sendDeviceCommand } from "../utils/deviceCommands";

export default function RemoteControlScreen({ route }) {
  const { device } = route.params;
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  const handleCommand = (command) => {
    sendDeviceCommand(device, command);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Device Info */}
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.deviceBrand}>{device.brand}</Text>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: "#10B981" }]} />
          <Text style={styles.statusText}>Connected</Text>
        </View>
      </View>

      {/* Power Button */}
      <View style={styles.powerSection}>
        <TouchableOpacity
          style={styles.powerButton}
          onPress={() => handleCommand("power")}
        >
          <Ionicons name="power" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Volume Control */}
      <View style={styles.controlSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Volume</Text>
          <Text style={styles.volumeValue}>{Math.round(volume)}%</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={volume}
          onValueChange={setVolume}
          minimumTrackTintColor="#3B82F6"
          maximumTrackTintColor="#374151"
          thumbTintColor="#3B82F6"
        />
        <View style={styles.volumeButtons}>
          <TouchableOpacity
            style={styles.volumeButton}
            onPress={() => setVolume(Math.max(0, volume - 5))}
          >
            <Ionicons name="volume-medium" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.volumeButton}
            onPress={() => setIsMuted(!isMuted)}
          >
            <Ionicons
              name={isMuted ? "volume-mute" : "volume-high"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.volumeButton}
            onPress={() => setVolume(Math.min(100, volume + 5))}
          >
            <Ionicons name="volume-high" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* D-Pad Navigation */}
      <View style={styles.controlSection}>
        <Text style={styles.sectionTitle}>Navigation</Text>
        <View style={styles.dPad}>
          <View style={styles.dPadRow}>
            <TouchableOpacity
              style={styles.dPadButton}
              onPress={() => handleCommand("up")}
            >
              <Ionicons name="chevron-up" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.dPadRow}>
            <TouchableOpacity
              style={styles.dPadButton}
              onPress={() => handleCommand("left")}
            >
              <Ionicons name="chevron-back" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dPadButton, styles.dPadCenter]}
              onPress={() => handleCommand("ok")}
            >
              <Ionicons name="radio-button-on" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dPadButton}
              onPress={() => handleCommand("right")}
            >
              <Ionicons name="chevron-forward" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.dPadRow}>
            <TouchableOpacity
              style={styles.dPadButton}
              onPress={() => handleCommand("down")}
            >
              <Ionicons name="chevron-down" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Media Controls */}
      <View style={styles.controlSection}>
        <Text style={styles.sectionTitle}>Media Controls</Text>
        <View style={styles.mediaButtons}>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => handleCommand("previous")}
          >
            <Ionicons name="play-skip-back" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => handleCommand("play")}
          >
            <Ionicons name="play" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => handleCommand("pause")}
          >
            <Ionicons name="pause" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => handleCommand("next")}
          >
            <Ionicons name="play-skip-forward" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.controlSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => handleCommand("menu")}
          >
            <Ionicons name="menu" size={24} color="#fff" />
            <Text style={styles.quickButtonText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => handleCommand("home")}
          >
            <Ionicons name="home" size={24} color="#fff" />
            <Text style={styles.quickButtonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => handleCommand("back")}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.quickButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 20,
  },
  deviceInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  deviceName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  deviceBrand: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2937",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: "#10B981",
    fontSize: 12,
  },
  powerSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  powerButton: {
    backgroundColor: "#EF4444",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  controlSection: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  volumeValue: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  volumeButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 12,
  },
  volumeButton: {
    backgroundColor: "#374151",
    padding: 12,
    borderRadius: 8,
  },
  dPad: {
    alignItems: "center",
    marginTop: 12,
  },
  dPadRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 12,
  },
  dPadButton: {
    backgroundColor: "#374151",
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  dPadCenter: {
    backgroundColor: "#3B82F6",
  },
  mediaButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  mediaButton: {
    backgroundColor: "#374151",
    padding: 16,
    borderRadius: 8,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  quickButton: {
    backgroundColor: "#374151",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  quickButtonText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});
