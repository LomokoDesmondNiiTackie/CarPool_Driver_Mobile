import { Modal, Animated, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { User } from "lucide-react-native";
import DriverDrawer from "./driverdrawer";
import DriverLogoutDialog from "./driverlogoutdialog";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};
const DRAWER_WIDTH = Dimensions.get("window").width * 0.82;

export interface Driver {
  name: string;
  busNumber: string;
  busType: string;
  route: { from: string; to: string };
  seat: number;
}

interface Props {
  driver: Driver;
}

export default function DriverHamburger({ driver }: Props) {
  const router = useRouter();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeBgAnim = useRef(new Animated.Value(0)).current;
  const dialogScale = useRef(new Animated.Value(0.85)).current;
  const dialogFade = useRef(new Animated.Value(0)).current;

  // ── Drawer ──
  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(fadeBgAnim, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = (cb?: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(fadeBgAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setDrawerVisible(false);
      cb?.();
    });
  };

  // ── Logout dialog ──
  const openLogout = () => {
    setLogoutVisible(true);
    Animated.parallel([
      Animated.spring(dialogScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 10,
      }),
      Animated.timing(dialogFade, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogoutPress = () => closeDrawer(() => openLogout());
  const handleLogoutConfirm = () => {
    setLogoutVisible(false);
    router.replace("../auth/login");
  };
  const handleLogoutCancel = () => setLogoutVisible(false);

  return (
    <>
      {/* Trigger button */}
      <TouchableOpacity
        style={styles.trigger}
        onPress={openDrawer}
        activeOpacity={0.8}
      >
        <User color={C.white} size={20} />
      </TouchableOpacity>

      {/* Drawer */}
      <Modal
        transparent
        visible={drawerVisible}
        animationType="none"
        statusBarTranslucent
      >
        <DriverDrawer
          driver={driver}
          slideAnim={slideAnim}
          fadeAnim={fadeBgAnim}
          drawerWidth={DRAWER_WIDTH}
          onClose={() => closeDrawer()}
          onLogoutPress={handleLogoutPress}
        />
      </Modal>

      {/* Logout dialog */}
      <DriverLogoutDialog
        visible={logoutVisible}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: C.black,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.red + "55",
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
});
