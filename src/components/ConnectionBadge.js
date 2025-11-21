import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ConnectionBadge({ connection }) {
  const getConnectionDetails = (type) => {
    switch (type) {
      case "wifi":
        return { icon: "wifi", label: "WiFi", color: "#3B82F6" };
      case "bluetooth":
        return { icon: "bluetooth", label: "Bluetooth", color: "#8B5CF6" };
      case "ir":
        return { icon: "radio", label: "Infrared", color: "#EF4444" };
      default:
        return { icon: "help", label: "Unknown", color: "#6B7280" };
    }
  };

  const details = getConnectionDetails(connection);

  return (
    <View style={[styles.badge, { backgroundColor: details.color + "20" }]}>
      <Ionicons name={details.icon} size={12} color={details.color} />
      <Text style={[styles.text, { color: details.color }]}>
        {details.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
});
