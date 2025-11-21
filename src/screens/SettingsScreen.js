import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  TextInput,
} from "react-native";
import { useDevices } from "../context/DeviceContext";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const { rooms, devices, addRoom, removeRoom } = useDevices();
  const [wifiAutoConnect, setWifiAutoConnect] = useState(true);
  const [bluetoothAutoPair, setBluetoothAutoPair] = useState(true);
  const [irLearningMode, setIrLearningMode] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

  const handleAddRoom = () => {
    if (newRoomName.trim()) {
      addRoom(newRoomName.trim());
      setNewRoomName("");
      Alert.alert("Success", "Room added successfully!");
    }
  };

  const handleRemoveRoom = (roomName) => {
    Alert.alert("Remove Room", `Are you sure you want to remove ${roomName}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => removeRoom(roomName),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Rooms Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rooms</Text>
        <View style={styles.sectionCard}>
          {rooms.map((room) => (
            <View key={room} style={styles.roomItem}>
              <View style={styles.roomInfo}>
                <Ionicons name="home" size={20} color="#3B82F6" />
                <Text style={styles.roomName}>{room}</Text>
                <Text style={styles.roomCount}>
                  {devices.filter((d) => d.room === room).length} devices
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveRoom(room)}>
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.addRoomContainer}>
            <TextInput
              style={styles.roomInput}
              placeholder="New room name"
              placeholderTextColor="#6B7280"
              value={newRoomName}
              onChangeText={setNewRoomName}
            />
            <TouchableOpacity
              style={styles.addRoomButton}
              onPress={handleAddRoom}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Connection Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connection Settings</Text>
        <View style={styles.sectionCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="wifi" size={20} color="#3B82F6" />
              <Text style={styles.settingLabel}>WiFi Auto-connect</Text>
            </View>
            <Switch
              value={wifiAutoConnect}
              onValueChange={setWifiAutoConnect}
              trackColor={{ false: "#374151", true: "#60A5FA" }}
              thumbColor={wifiAutoConnect ? "#3B82F6" : "#9CA3AF"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="bluetooth" size={20} color="#8B5CF6" />
              <Text style={styles.settingLabel}>Bluetooth Auto-pair</Text>
            </View>
            <Switch
              value={bluetoothAutoPair}
              onValueChange={setBluetoothAutoPair}
              trackColor={{ false: "#374151", true: "#A78BFA" }}
              thumbColor={bluetoothAutoPair ? "#8B5CF6" : "#9CA3AF"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="radio" size={20} color="#EF4444" />
              <Text style={styles.settingLabel}>IR Learning Mode</Text>
            </View>
            <Switch
              value={irLearningMode}
              onValueChange={setIrLearningMode}
              trackColor={{ false: "#374151", true: "#FCA5A5" }}
              thumbColor={irLearningMode ? "#EF4444" : "#9CA3AF"}
            />
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.sectionCard}>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Supported Protocols</Text>
            <Text style={styles.aboutValue}>WiFi, Bluetooth, Infrared</Text>
          </View>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Total Devices</Text>
            <Text style={styles.aboutValue}>{devices.length}</Text>
          </View>
        </View>
      </View>

      {/* Help & Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help & Support</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.linkItem}>
            <Ionicons name="book-outline" size={20} color="#3B82F6" />
            <Text style={styles.linkText}>User Guide</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Ionicons name="help-circle-outline" size={20} color="#3B82F6" />
            <Text style={styles.linkText}>FAQ</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Ionicons name="mail-outline" size={20} color="#3B82F6" />
            <Text style={styles.linkText}>Contact Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  sectionCard: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
  },
  roomItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  roomInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  roomName: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  roomCount: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  addRoomContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  roomInput: {
    flex: 1,
    backgroundColor: "#374151",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  addRoomButton: {
    backgroundColor: "#3B82F6",
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingLabel: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
  aboutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  aboutLabel: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  aboutValue: {
    color: "#fff",
    fontSize: 14,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
});
