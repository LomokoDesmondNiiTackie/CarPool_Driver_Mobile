import { View, Text, StyleSheet } from "react-native";
import { CheckCircle } from "lucide-react-native";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

export default function RiderListEmpty() {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <CheckCircle color={C.green} size={40} strokeWidth={1.5} />
      </View>
      <Text style={styles.title}>All riders boarded!</Text>
      <Text style={styles.sub}>Everyone is on the bus. Ready to depart.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", paddingTop: 60, gap: 12 },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: C.green + "18",
    borderWidth: 1.5,
    borderColor: C.green + "44",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: { fontSize: 18, fontWeight: "800", color: C.black },
  sub: { fontSize: 13, color: "#888", fontWeight: "500", textAlign: "center" },
});
