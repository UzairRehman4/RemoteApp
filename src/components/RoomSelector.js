import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDevices } from "../context/DeviceContext";

export default function RoomSelector() {
  const { rooms, selectedRoom, setSelectedRoom } = useDevices();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Room</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {rooms.map((room) => (
          <TouchableOpacity
            key={room}
            style={[
              styles.roomChip,
              selectedRoom === room && styles.roomChipSelected,
            ]}
            onPress={() => setSelectedRoom(room)}
          >
            <Text
              style={[
                styles.roomText,
                selectedRoom === room && styles.roomTextSelected,
              ]}
            >
              {room}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 12,
  },
  scrollView: {
    flexDirection: "row",
  },
  roomChip: {
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  roomChipSelected: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  roomText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  roomTextSelected: {
    color: "#fff",
  },
});
