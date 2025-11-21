import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ConnectionBadge from "./ConnectionBadge";

export default function DeviceCard({
  device,
  onPress,
  onDelete,
  showActions = false,
}) {
  const getDeviceIcon = (type) => {
    switch (type) {
      case "tv":
        return "tv";
      case "ac":
        return "snow";
      case "projector":
        return "videocam";
      case "speaker":
        return "volume-high";
      default:
        return "hardware-chip";
    }
  };

  const getDeviceColor = (type) => {
    switch (type) {
      case "tv":
        return "#3B82F6";
      case "ac":
        return "#10B981";
      case "projector":
        return "#8B5CF6";
      case "speaker":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: getDeviceColor(device.type) + "20" },
          ]}
        >
          <Ionicons
            name={getDeviceIcon(device.type)}
            size={28}
            color={getDeviceColor(device.type)}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{device.name}</Text>
          <Text style={styles.brand}>
            {device.brand} • {device.room}
          </Text>
          <ConnectionBadge connection={device.connection} />
        </View>
      </View>
      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.controlButton} onPress={onPress}>
            <Text style={styles.controlButtonText}>Control</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Ionicons name="trash-outline" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      {!showActions && (
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  brand: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 6,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  controlButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  controlButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    padding: 8,
    borderRadius: 6,
    width: 32,
    alignItems: "center",
  },
});
