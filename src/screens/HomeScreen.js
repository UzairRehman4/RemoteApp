import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Universal Remote App</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Devices")}
      >
        <Text style={styles.buttonText}>View Devices</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 40 },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 10,
    width: "70%",
    marginVertical: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 18 },
});
