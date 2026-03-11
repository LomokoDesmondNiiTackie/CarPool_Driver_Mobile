import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Phone, QrCode } from "lucide-react-native";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

export interface PickupPoint {
  label: string;
  lat: number;
  lng: number;
}

export interface Rider {
  id: string;
  name: string;
  phone: string;
  seat: string;
  qrValue: string;
  boarded: boolean;
  pickup: PickupPoint;
}

interface Props {
  rider: Rider;
  onScanPress: (rider: Rider) => void;
}

export default function RiderCard({ rider, onScanPress }: Props) {
  const initials = rider.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{rider.name}</Text>
        <View style={styles.metaRow}>
          <Phone color="#AAA" size={11} />
          <Text style={styles.phone}>{rider.phone}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Pending</Text>
        </View>
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => onScanPress(rider)}
          activeOpacity={0.8}
        >
          <QrCode color={C.white} size={14} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: C.black,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: { color: C.white, fontSize: 15, fontWeight: "800" },
  info: { flex: 1, gap: 4 },
  name: { fontSize: 14, fontWeight: "800", color: C.black },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  phone: { fontSize: 11, color: "#888", fontWeight: "500" },
  right: { alignItems: "center", gap: 8 },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: C.red + "18",
    borderWidth: 1,
    borderColor: C.red + "44",
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  statusDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: C.red },
  statusText: { fontSize: 9, fontWeight: "800", color: C.red },

  scanBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: C.black,
    alignItems: "center",
    justifyContent: "center",
  },
});
