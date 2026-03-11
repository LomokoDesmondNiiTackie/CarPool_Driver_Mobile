import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
  ScrollView,
} from "react-native";
import {
  X,
  Bus,
  MapPin,
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  User,
} from "lucide-react-native";
import { DriverInfoRow } from "./driverinforow";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Driver {
  name: string;
  busNumber: string;
  busType: string;
  route: { from: string; to: string };
  seat: number;
}

interface Props {
  driver: Driver;
  slideAnim: Animated.Value;
  fadeAnim: Animated.Value;
  drawerWidth: number;
  onClose: () => void;
  onLogoutPress: () => void;
}

export default function DriverDrawer({
  driver,
  slideAnim,
  fadeAnim,
  drawerWidth,
  onClose,
  onLogoutPress,
}: Props) {
  const initials = driver.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      {/* Drawer panel */}
      <Animated.View
        style={[
          styles.drawer,
          { width: drawerWidth, transform: [{ translateX: slideAnim }] },
        ]}
      >
        {/* Dark header */}
        <View style={styles.header}>
          <View style={styles.blobRed} />
          <View style={styles.blobGreen} />

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X color={C.white} size={18} />
          </TouchableOpacity>

          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <Text style={styles.driverName}>{driver.name}</Text>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>Driver</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {/* Bus info */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>BUS INFO</Text>
            <DriverInfoRow
              icon={Bus}
              iconColor={C.red}
              label="Bus Number"
              value={driver.busNumber}
            />
            <View style={styles.divider} />
            <DriverInfoRow
              icon={Bus}
              iconColor={C.red}
              label="Bus Type"
              value={driver.busType}
              last
            />
          </View>

          {/* Route */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>ASSIGNED ROUTE</Text>
            <DriverInfoRow
              icon={MapPin}
              iconColor={C.green}
              label="From"
              value={driver.route.from}
            />
            <View style={styles.divider} />
            <DriverInfoRow
              icon={MapPin}
              iconColor={C.red}
              label="To"
              value={driver.route.to}
              last
            />
          </View>

          {/* Capacity */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>CAPACITY</Text>
            <DriverInfoRow
              icon={User}
              iconColor={C.green}
              label="Max Riders"
              value={`${driver.seat} seats`}
              last
            />
          </View>

          {/* Menu */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>MENU</Text>
            <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
              <View
                style={[styles.menuIcon, { backgroundColor: C.green + "18" }]}
              >
                <Phone color={C.green} size={15} />
              </View>
              <Text style={styles.menuLabel}>Support</Text>
              <ChevronRight
                color="#CCC"
                size={16}
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
              <View
                style={[styles.menuIcon, { backgroundColor: C.red + "18" }]}
              >
                <Mail color={C.red} size={15} />
              </View>
              <Text style={styles.menuLabel}>Contact Admin</Text>
              <ChevronRight
                color="#CCC"
                size={16}
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={onLogoutPress}
            activeOpacity={0.85}
          >
            <LogOut color={C.red} size={17} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#F2F2F7",
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },
  scroll: { paddingBottom: 48 },

  header: {
    backgroundColor: C.black,
    paddingTop: 64,
    paddingBottom: 28,
    paddingHorizontal: 24,
    overflow: "hidden",
  },
  blobRed: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: C.red,
    opacity: 0.12,
  },
  blobGreen: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: C.green,
    opacity: 0.08,
  },
  closeBtn: {
    position: "absolute",
    top: 56,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarInitials: {
    color: C.white,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
  },
  driverName: {
    color: C.white,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.2,
    marginBottom: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    backgroundColor: C.green + "18",
    borderWidth: 1,
    borderColor: C.green + "44",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.green },
  badgeText: { color: C.green, fontSize: 10, fontWeight: "800" },

  section: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: C.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#AAA",
    marginBottom: 8,
  },
  divider: { height: 1, backgroundColor: "#F0F0F0" },

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
  },
  menuIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: { fontSize: 14, fontWeight: "700", color: C.black },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.red + "55",
    backgroundColor: C.red + "10",
  },
  logoutText: {
    color: C.red,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
