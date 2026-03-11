import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { useRef, useEffect } from "react";
import { X, Phone, MapPin, QrCode } from "lucide-react-native";
import { Rider } from "@/component/driver/riderCard";
import { useMapStore } from "@/store/map.store";


const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Props {
  rider: Rider | null;
  onScan: (rider: Rider) => void;
}

export default function RiderDetailSheet({
  rider,
  onScan,
}: Props) {
  const slideAnim = useRef(new Animated.Value(400)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { detailVisible, setDetailVisible } = useMapStore();


  useEffect(() => {
    if (detailVisible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideAnim.setValue(400);
      fadeAnim.setValue(0);
    }
  }, [detailVisible, slideAnim, fadeAnim]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(()=> setDetailVisible(false));
  };

  if (!rider) return null;
  const initials = rider.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Modal
      transparent
      visible={detailVisible}
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <Pressable style={{ flex: 1 }} onPress={handleClose} />
      </Animated.View>

      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>RIDER DETAILS</Text>
            <Text style={styles.title}>{rider.name}</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <X color="#888" size={18} />
          </TouchableOpacity>
        </View>
        <View style={styles.redRule} />

        {/* Rider card */}
        <View style={styles.riderCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>{initials}</Text>
            <View style={styles.avatarBadge}>
              <View style={styles.avatarBadgeDot} />
            </View>
          </View>
          <View style={styles.riderBody}>
            <Text style={styles.riderName}>{rider.name}</Text>
            <View style={styles.detailRow}>
              <Phone color="#AAA" size={13} />
              <Text style={styles.detailText}>{rider.phone}</Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin color="#AAA" size={13} />
              <Text style={styles.detailText}>{rider.pickup.label}</Text>
            </View>
          </View>
          <View style={styles.seatBadge}>
            <Text style={styles.seatLabel}>SEAT</Text>
            <Text style={styles.seatValue}>{rider.seat}</Text>
          </View>
        </View>

        {/* Coordinates */}
        <View style={styles.coordRow}>
          <View style={styles.coordItem}>
            <Text style={styles.coordLabel}>LATITUDE</Text>
            <Text style={styles.coordValue}>{rider.pickup.lat.toFixed(4)}</Text>
          </View>
          <View style={styles.coordDivider} />
          <View style={styles.coordItem}>
            <Text style={styles.coordLabel}>LONGITUDE</Text>
            <Text style={styles.coordValue}>{rider.pickup.lng.toFixed(4)}</Text>
          </View>
        </View>

        {/* Scan button */}
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => {
            handleClose();
            setTimeout(() => onScan(rider), 300);
          }}
          activeOpacity={0.85}
        >
          <QrCode color={C.white} size={20} />
          <Text style={styles.scanBtnText}>Scan QR to Board</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 44,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDD",
    alignSelf: "center",
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  eyebrow: {
    color: C.red,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 4,
  },
  title: {
    color: C.black,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  redRule: {
    height: 3,
    width: 32,
    backgroundColor: C.red,
    borderRadius: 2,
    marginBottom: 20,
  },

  riderCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#F8F8FF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EBEBF0",
    marginBottom: 14,
  },
  avatar: {
    position: "relative",
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: C.black,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: { color: C.white, fontSize: 17, fontWeight: "800" },
  avatarBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: C.red,
    borderWidth: 2,
    borderColor: C.white,
  },
  avatarBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.white,
    margin: 2,
  },

  riderBody: { flex: 1, gap: 4 },
  riderName: { fontSize: 15, fontWeight: "800", color: C.black },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  detailText: { fontSize: 11, color: "#888", fontWeight: "500" },

  seatBadge: { alignItems: "center" },
  seatLabel: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#AAA",
  },
  seatValue: { fontSize: 18, fontWeight: "800", color: C.black },

  coordRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5FA",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  coordItem: { flex: 1, alignItems: "center", gap: 3 },
  coordLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#AAA",
  },
  coordValue: {
    fontSize: 14,
    fontWeight: "800",
    color: C.black,
    fontVariant: ["tabular-nums"],
  },
  coordDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 12,
  },

  scanBtn: {
    backgroundColor: C.black,
    borderRadius: 18,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  scanBtnText: {
    color: C.white,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
