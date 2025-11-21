import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDevices } from "../context/DeviceContext";
import { Ionicons } from "@expo/vector-icons";
import DeviceCard from "../components/DeviceCard";

export default function DevicesScreen({ navigation }) {
  const { devices, removeDevice } = useDevices();
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      Alert.alert("Scan Complete", "No new devices found");
    }, 2000);
  };

  const handleDeleteDevice = (deviceId, deviceName) => {
    Alert.alert(
      "Remove Device",
      `Are you sure you want to remove ${deviceName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeDevice(deviceId),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Devices</Text>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={handleScan}
          disabled={scanning}
        >
          <Ionicons name="search" size={20} color="#fff" />
          <Text style={styles.scanButtonText}>
            {scanning ? "Scanning..." : "Scan"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.deviceList}>
        {devices.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="hardware-chip-outline" size={64} color="#6B7280" />
            <Text style={styles.emptyText}>No devices added yet</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("Add Device")}
            >
              <Text style={styles.addButtonText}>Add Your First Device</Text>
            </TouchableOpacity>
          </View>
        ) : (
          devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onPress={() => navigation.navigate("RemoteControl", { device })}
              onDelete={() => handleDeleteDevice(device.id, device.name)}
              showActions
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  deviceList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    backgroundColor: "#1F2937",
    padding: 40,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
