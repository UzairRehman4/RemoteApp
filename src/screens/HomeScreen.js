import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDevices } from "../context/DeviceContext";
import { Ionicons } from "@expo/vector-icons";
import DeviceCard from "../components/DeviceCard";
import RoomSelector from "../components/RoomSelector";

export default function HomeScreen({ navigation }) {
  const { devices, selectedRoom, rooms } = useDevices();

  const roomDevices = devices.filter((d) => d.room === selectedRoom);
  const recentDevices = roomDevices.slice(0, 5);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RemoteApp Universal</Text>
        <Text style={styles.subtitle}>Control all your devices</Text>
      </View>

      <RoomSelector />

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: "#3B82F6" }]}>
          <Text style={styles.statNumber}>{devices.length}</Text>
          <Text style={styles.statLabel}>Total Devices</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#10B981" }]}>
          <Text style={styles.statNumber}>{roomDevices.length}</Text>
          <Text style={styles.statLabel}>In {selectedRoom}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#8B5CF6" }]}>
          <Text style={styles.statNumber}>{rooms.length}</Text>
          <Text style={styles.statLabel}>Rooms</Text>
        </View>
      </View>

      {/* Recent Devices */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Devices</Text>
        {recentDevices.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="hardware-chip-outline" size={64} color="#6B7280" />
            <Text style={styles.emptyText}>No devices in this room</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("Add Device")}
            >
              <Text style={styles.addButtonText}>Add Device</Text>
            </TouchableOpacity>
          </View>
        ) : (
          recentDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onPress={() => navigation.navigate("RemoteControl", { device })}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
    opacity: 0.9,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  emptyState: {
    backgroundColor: "#1F2937",
    padding: 40,
    borderRadius: 12,
    alignItems: "center",
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
