import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDevices } from "../context/DeviceContext";
import { Ionicons } from "@expo/vector-icons";
import { DEVICE_TYPES, CONNECTION_TYPES } from "../constants/deviceTypes";

export default function AddDeviceScreen({ navigation }) {
  const { addDevice, selectedRoom, rooms } = useDevices();
  const [deviceType, setDeviceType] = useState("");
  const [connectionType, setConnectionType] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [deviceBrand, setDeviceBrand] = useState("");
  const [room, setRoom] = useState(selectedRoom);

  const handleSubmit = () => {
    if (!deviceType || !connectionType || !deviceName || !deviceBrand) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    addDevice({
      type: deviceType,
      connection: connectionType,
      name: deviceName,
      brand: deviceBrand,
      room: room,
    });

    Alert.alert("Success", "Device added successfully!", [
      { text: "OK", onPress: () => navigation.navigate("Devices") },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Device</Text>

      {/* Device Type */}
      <View style={styles.section}>
        <Text style={styles.label}>Device Type</Text>
        <View style={styles.optionsGrid}>
          {DEVICE_TYPES.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.optionCard,
                deviceType === type.value && styles.optionCardSelected,
              ]}
              onPress={() => setDeviceType(type.value)}
            >
              <Ionicons
                name={type.icon}
                size={32}
                color={deviceType === type.value ? "#3B82F6" : "#9CA3AF"}
              />
              <Text
                style={[
                  styles.optionLabel,
                  deviceType === type.value && styles.optionLabelSelected,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Connection Type */}
      <View style={styles.section}>
        <Text style={styles.label}>Connection Type</Text>
        <View style={styles.optionsGrid}>
          {CONNECTION_TYPES.map((conn) => (
            <TouchableOpacity
              key={conn.value}
              style={[
                styles.optionCard,
                connectionType === conn.value && styles.optionCardSelected,
              ]}
              onPress={() => setConnectionType(conn.value)}
            >
              <Ionicons
                name={conn.icon}
                size={28}
                color={connectionType === conn.value ? "#3B82F6" : "#9CA3AF"}
              />
              <Text
                style={[
                  styles.optionLabel,
                  connectionType === conn.value && styles.optionLabelSelected,
                ]}
              >
                {conn.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Device Name */}
      <View style={styles.section}>
        <Text style={styles.label}>Device Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Living Room TV"
          placeholderTextColor="#6B7280"
          value={deviceName}
          onChangeText={setDeviceName}
        />
      </View>

      {/* Brand */}
      <View style={styles.section}>
        <Text style={styles.label}>Brand</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Samsung, LG, Sony"
          placeholderTextColor="#6B7280"
          value={deviceBrand}
          onChangeText={setDeviceBrand}
        />
      </View>

      {/* Room */}
      <View style={styles.section}>
        <Text style={styles.label}>Assign to Room</Text>
        <View style={styles.roomsContainer}>
          {rooms.map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.roomChip, room === r && styles.roomChipSelected]}
              onPress={() => setRoom(r)}
            >
              <Text
                style={[
                  styles.roomChipText,
                  room === r && styles.roomChipTextSelected,
                ]}
              >
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="checkmark" size={20} color="#fff" />
        <Text style={styles.submitButtonText}>Add Device</Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  optionCard: {
    backgroundColor: "#1F2937",
    borderWidth: 2,
    borderColor: "#374151",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    minWidth: "45%",
  },
  optionCardSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#1E3A8A",
  },
  optionLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  optionLabelSelected: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
    padding: 16,
    color: "#fff",
    fontSize: 16,
  },
  roomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  roomChip: {
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  roomChipSelected: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  roomChipText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  roomChipTextSelected: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginBottom: 40,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
