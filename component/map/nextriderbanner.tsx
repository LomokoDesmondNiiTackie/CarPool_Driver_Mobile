import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Navigation, Phone, MapPin, Users } from "lucide-react-native";
import { Rider } from "@/component/driver/riderCard";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Props {
  rider: Rider | null;
  distance: string | null;
  pendingCount: number;
  boardedCount: number;
  onNavigate: () => void;
}

export default function NextRiderBanner({
  rider,
  distance,
  pendingCount,
  boardedCount,
  onNavigate,
}: Props) {
  if (!rider) {
    return (
      <View style={styles.emptyBanner}>
        <View style={styles.emptyIcon}>
          <Users color={C.green} size={24} />
        </View>
        <View>
          <Text style={styles.emptyTitle}>All riders boarded!</Text>
          <Text style={styles.emptySub}>Ready to depart 🎉</Text>
        </View>
      </View>
    );
  }

  const initials = rider.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <View style={styles.banner}>
      <View style={styles.blobRed} />

      {/* Stats pill */}
      <View style={styles.statsRow}>
        <View style={styles.statPill}>
          <View style={[styles.statDot, { backgroundColor: C.red }]} />
          <Text style={styles.statText}>{pendingCount} pending</Text>
        </View>
        <View
          style={[
            styles.statPill,
            { backgroundColor: C.green + "18", borderColor: C.green + "44" },
          ]}
        >
          <View style={[styles.statDot, { backgroundColor: C.green }]} />
          <Text style={[styles.statText, { color: C.green }]}>
            {boardedCount} boarded
          </Text>
        </View>
      </View>

      {/* Next rider label */}
      <Text style={styles.eyebrow}>NEXT PICKUP</Text>

      <View style={styles.riderRow}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>

        {/* Info */}
        <View style={styles.riderInfo}>
          <Text style={styles.riderName}>{rider.name}</Text>
          <View style={styles.metaRow}>
            <Phone color="#AAA" size={11} />
            <Text style={styles.metaText}>{rider.phone}</Text>
          </View>
          <View style={styles.metaRow}>
            <MapPin color="#AAA" size={11} />
            <Text style={styles.metaText}>{rider.pickup.label}</Text>
          </View>
        </View>

        {/* Distance + navigate */}
        <View style={styles.rightCol}>
          {distance && (
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceValue}>{distance}</Text>
              <Text style={styles.distanceLabel}>away</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.navBtn}
            onPress={onNavigate}
            activeOpacity={0.85}
          >
            <Navigation color={C.white} size={14} />
            <Text style={styles.navText}>Navigate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: C.black,
    borderRadius: 24,
    padding: 18,
    overflow: "hidden",
  },
  blobRed: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: C.red,
    opacity: 0.1,
  },
  emptyBanner: {
    backgroundColor: C.white,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1.5,
    borderColor: C.green + "44",
  },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: C.green + "18",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: { fontSize: 15, fontWeight: "800", color: C.black },
  emptySub: { fontSize: 12, color: "#888", fontWeight: "500" },

  statsRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: C.red + "18",
    borderWidth: 1,
    borderColor: C.red + "44",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statDot: { width: 5, height: 5, borderRadius: 3 },
  statText: { color: C.red, fontSize: 10, fontWeight: "800" },

  eyebrow: {
    color: "rgba(248,248,255,0.4)",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2.5,
    marginBottom: 10,
  },

  riderRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: { color: C.white, fontSize: 15, fontWeight: "800" },
  riderInfo: { flex: 1, gap: 3 },
  riderName: { color: C.white, fontSize: 15, fontWeight: "800" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { color: "rgba(248,248,255,0.5)", fontSize: 11, fontWeight: "500" },

  rightCol: { alignItems: "center", gap: 8 },
  distanceBadge: { alignItems: "center" },
  distanceValue: { color: C.green, fontSize: 16, fontWeight: "800" },
  distanceLabel: {
    color: "rgba(248,248,255,0.4)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },
  navBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: C.green,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    shadowColor: C.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  navText: { color: C.white, fontSize: 11, fontWeight: "800" },
});
