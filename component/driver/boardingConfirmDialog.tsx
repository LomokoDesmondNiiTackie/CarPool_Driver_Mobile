import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { CheckCircle, X, Phone, MapPin } from "lucide-react-native";
import { useRef, useEffect } from "react";
import { Rider } from "./riderCard";
import { useMapStore } from "@/store/map.store";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Props {
  rider: Rider | null;
  onConfirm: () => void;
}

export default function BoardingConfirmDialog({
  rider,
  onConfirm,
}: Props) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { confirmVisible, setConfirmVisible, setConfirmedRider } = useMapStore();


  useEffect(() => {
    if (confirmVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,
          friction: 10,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.85);
      fadeAnim.setValue(0);
    }
  }, [confirmVisible, scaleAnim, fadeAnim]);

  const handleCancel = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(()=> {setConfirmVisible(false); setConfirmedRider(null)});
  };

  const handleConfirm = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(onConfirm);
  };

  return (
    <Modal
      transparent
      visible={confirmVisible}
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <Pressable style={{ flex: 1 }} onPress={handleCancel} />
      </Animated.View>

      <View style={styles.centered}>
        <Animated.View
          style={[
            styles.card,
            { transform: [{ scale: scaleAnim }], opacity: fadeAnim },
          ]}
        >
          <TouchableOpacity style={styles.closeBtn} onPress={handleCancel}>
            <X color="#AAA" size={16} />
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <CheckCircle color={C.white} size={30} strokeWidth={2} />
            </View>
          </View>

          <Text style={styles.eyebrow}>QR VERIFIED</Text>
          <Text style={styles.title}>Confirm Boarding</Text>
          <View style={styles.redRule} />

          {/* Rider info */}
          {rider && (
            <View style={styles.riderCard}>
              <View style={styles.riderAvatar}>
                <Text style={styles.riderInitials}>
                  {rider.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
              <View style={styles.riderBody}>
                <Text style={styles.riderName}>{rider.name}</Text>
                <View style={styles.riderRow}>
                  <Phone color="#AAA" size={12} />
                  <Text style={styles.riderDetail}>{rider.phone}</Text>
                </View>
                <View style={styles.riderRow}>
                  <MapPin color="#AAA" size={12} />
                  <Text style={styles.riderDetail}>Seat {rider.seat}</Text>
                </View>
              </View>
            </View>
          )}

          <Text style={styles.sub}>
            Mark this rider as boarded and remove them from the pending list?
          </Text>

          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.btnCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnConfirm}
              onPress={handleConfirm}
              activeOpacity={0.85}
            >
              <CheckCircle color={C.white} size={16} />
              <Text style={styles.btnConfirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  centered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  card: {
    width: "100%",
    backgroundColor: C.white,
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 16,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  iconOuter: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: C.green + "18",
    borderWidth: 1.5,
    borderColor: C.green + "44",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconInner: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
  },

  eyebrow: {
    color: C.green,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 4,
  },
  title: {
    color: C.black,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  redRule: {
    height: 3,
    width: 32,
    backgroundColor: C.red,
    borderRadius: 2,
    marginBottom: 16,
  },

  riderCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    width: "100%",
    backgroundColor: "#F8F8FF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EBEBF0",
  },
  riderAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: C.black,
    alignItems: "center",
    justifyContent: "center",
  },
  riderInitials: { color: C.white, fontSize: 16, fontWeight: "800" },
  riderBody: { flex: 1, gap: 4 },
  riderName: { fontSize: 15, fontWeight: "800", color: C.black },
  riderRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  riderDetail: { fontSize: 12, color: "#888", fontWeight: "500" },

  sub: {
    color: "#888",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 24,
  },

  btnRow: { flexDirection: "row", gap: 12, width: "100%" },
  btnCancel: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#DDD",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancelText: { color: C.black, fontSize: 15, fontWeight: "700" },
  btnConfirm: {
    flex: 1.3,
    height: 52,
    borderRadius: 16,
    backgroundColor: C.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    shadowColor: C.green,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  btnConfirmText: { color: C.white, fontSize: 15, fontWeight: "800" },
});
