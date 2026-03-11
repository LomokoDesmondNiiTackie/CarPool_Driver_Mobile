import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { LogOut, X, AlertTriangle } from "lucide-react-native";
import { useRef, useEffect } from "react";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DriverLogoutDialog({
  visible,
  onConfirm,
  onCancel,
}: Props) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
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
  }, [visible, scaleAnim, fadeAnim]);

  const animateOut = (cb: () => void) => {
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
    ]).start(cb);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <Pressable style={{ flex: 1 }} onPress={() => animateOut(onCancel)} />
      </Animated.View>

      <View style={styles.centered}>
        <Animated.View
          style={[
            styles.card,
            { transform: [{ scale: scaleAnim }], opacity: fadeAnim },
          ]}
        >
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => animateOut(onCancel)}
          >
            <X color="#AAA" size={16} />
          </TouchableOpacity>

          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <AlertTriangle color={C.white} size={28} strokeWidth={2} />
            </View>
          </View>

          <Text style={styles.eyebrow}>CONFIRM ACTION</Text>
          <Text style={styles.title}>Log Out?</Text>
          <View style={styles.redRule} />
          <Text style={styles.sub}>
            Are you sure you want to log out of your Driver account?
          </Text>

          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => animateOut(onCancel)}
              activeOpacity={0.8}
            >
              <Text style={styles.btnCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnConfirm}
              onPress={() => animateOut(onConfirm)}
              activeOpacity={0.85}
            >
              <LogOut color={C.white} size={16} />
              <Text style={styles.btnConfirmText}>Log Out</Text>
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
    paddingHorizontal: 32,
  },
  card: {
    width: "100%",
    backgroundColor: "#f8f8ff",
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
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: C.red + "18",
    borderWidth: 1.5,
    borderColor: C.red + "44",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconInner: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: {
    color: C.red,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 6,
  },
  title: {
    color: C.black,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  redRule: {
    height: 3,
    width: 32,
    backgroundColor: C.red,
    borderRadius: 2,
    marginBottom: 12,
  },
  sub: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
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
    backgroundColor: C.red,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    shadowColor: C.red,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  btnConfirmText: { color: C.white, fontSize: 15, fontWeight: "800" },
});
