import { View, Text, StyleSheet } from "react-native";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Props {
  from: string;
  to: string;
  total: number;
  boarded: number;
  pending: number;
  capacity: number;
}

export default function DriverRouteBanner({
  from,
  to,
  total,
  boarded,
  pending,
  capacity,
}: Props) {
  return (
    <View style={styles.banner}>
      <View style={styles.blobRed} />
      <View style={styles.blobGreen} />

      {/* Route */}
      <View style={styles.routeRow}>
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, { backgroundColor: C.red }]} />
          <View>
            <Text style={styles.routePointLabel}>FROM</Text>
            <Text style={styles.routePointCity}>{from}</Text>
          </View>
        </View>
        <View style={styles.routeDashes}>
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.dash} />
          ))}
          <View style={[styles.arrowHead, { borderLeftColor: C.green }]} />
        </View>
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, { backgroundColor: C.green }]} />
          <View>
            <Text style={styles.routePointLabel}>TO</Text>
            <Text style={styles.routePointCity}>{to}</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { label: "Total", value: total, color: C.white },
          { label: "Boarded", value: boarded, color: C.green },
          { label: "Pending", value: pending, color: C.red },
          { label: "Capacity", value: capacity, color: C.white },
        ].map((s, i, arr) => (
          <View key={s.label} style={styles.statGroup}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: s.color }]}>
                {s.value}
              </Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
            {i < arr.length - 1 && <View style={styles.statDivider} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: C.black,
    margin: 16,
    borderRadius: 24,
    padding: 22,
    overflow: "hidden",
  },
  blobRed: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: C.red,
    opacity: 0.09,
  },
  blobGreen: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: C.green,
    opacity: 0.09,
  },

  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  routePoint: { flexDirection: "row", alignItems: "center", gap: 8 },
  routeDot: { width: 10, height: 10, borderRadius: 5 },
  routePointLabel: {
    color: "rgba(248,248,255,0.38)",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  routePointCity: {
    color: C.white,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  routeDashes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  dash: {
    width: 6,
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  statGroup: { flexDirection: "row", alignItems: "center" },
  statItem: { alignItems: "center", gap: 2 },
  statValue: { fontSize: 20, fontWeight: "800" },
  statLabel: {
    color: "rgba(248,248,255,0.38)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginHorizontal: 16,
  },
});
