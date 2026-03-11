import { View, Text, StyleSheet } from "react-native";

export function DriverInfoRow({
  icon: Icon,
  iconColor,
  label,
  value,
  last = false,
}: {
  icon: any;
  iconColor: string;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.row, last && { borderBottomWidth: 0 }]}>
      <View style={[styles.icon, { backgroundColor: iconColor + "18" }]}>
        <Icon color={iconColor} size={15} />
      </View>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    color: "#AAA",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: { fontSize: 15, fontWeight: "700", color: "#111111" },
});
