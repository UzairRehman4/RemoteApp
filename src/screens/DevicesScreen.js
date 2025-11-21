import { View, Text, StyleSheet } from "react-native";

export default function DevicesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Devices</Text>
      <Text>TV, AC, Fan, Projector…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 10 },
});
