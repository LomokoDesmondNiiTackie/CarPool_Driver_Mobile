import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { QrCode, Users } from "lucide-react-native";

import DriverHamburger from "@/component/header/driverHamburger";
import DriverRouteBanner from "@/component/driver/driverRouteBanner";
import RiderCard, { Rider } from "@/component/driver/riderCard";
import RiderListEmpty from "@/component/driver/riderListEmpty";
import QrScanner from "@/component/driver/qrScanner";
import BoardingConfirmDialog from "@/component/driver/boardingConfirmDialog";
import { DRIVER, MOCK_RIDERS } from "@/data/mockRiders";
import { useMapStore } from "@/store/map.store";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

export default function DriverHome() {
  const {
    // riders,
    confirmedRider,
    // setRiders,
    setScannerVisible,
    setConfirmVisible,
    setConfirmedRider,
  } = useMapStore();

  const [riders, setRiders] = useState<Rider[]>(MOCK_RIDERS);
  const [scanningRider, setScanningRider] = useState<Rider | null>(null);

  const boardedCount = MOCK_RIDERS.length - riders.length;

  // ── Open scanner for a specific rider (or general scan) ──
  const openScanner = (rider: Rider | null) => {
    setScanningRider(rider);
    setScannerVisible(true);
  };

  // ── QR scanned → find matching rider, open confirm dialog ──
  const handleScanned = (data: string) => {
    setScannerVisible(false);
    const matched = riders.find((r) => r.qrValue === data) ?? scanningRider;
    setTimeout(() => {
      setConfirmedRider(matched);
      setConfirmVisible(true);
    }, 300);
  };

  // ── Confirm boarding → remove from list ──
  const handleConfirm = () => {
    setConfirmVisible(false);
    if (confirmedRider) {
      setRiders((prev: Rider[]) => prev.filter((r) => r.id !== confirmedRider.id));
    }
    setConfirmedRider(null);
  };


  return (
    <SafeAreaView style={styles.screen}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <DriverHamburger driver={DRIVER} />
        <View style={styles.headerCenter}>
          <Text style={styles.headerEyebrow}>DRIVER PANEL</Text>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
        <TouchableOpacity
          style={styles.qrTrigger}
          onPress={() => openScanner(null)}
          activeOpacity={0.8}
        >
          <QrCode color={C.white} size={20} />
        </TouchableOpacity>
      </View>

      {/* ── Route + stats banner ── */}
      <DriverRouteBanner
        from={DRIVER.route.from}
        to={DRIVER.route.to}
        total={MOCK_RIDERS.length}
        boarded={boardedCount}
        pending={riders.length}
        capacity={DRIVER.seat}
      />

      {/* ── List header ── */}
      <View style={styles.listHeader}>
        <Text style={styles.listEyebrow}>PENDING RIDERS</Text>
        <View style={styles.listCountBadge}>
          <Users color={C.red} size={12} />
          <Text style={styles.listCount}>{riders.length}</Text>
        </View>
      </View>

      {/* ── Riders FlatList ── */}
      <FlatList
        data={riders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<RiderListEmpty />}
        renderItem={({ item }) => (
          <RiderCard rider={item} onScanPress={openScanner} />
        )}
      />

      {/* ── QR Scanner ── */}
      <QrScanner targetRider={scanningRider} onScanned={handleScanned} />

      {/* ── Boarding confirm dialog ── */}
      <BoardingConfirmDialog rider={confirmedRider} onConfirm={handleConfirm} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F2F2F7" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBF0",
  },
  headerCenter: { alignItems: "center" },
  headerEyebrow: {
    color: C.red,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
  },
  headerTitle: {
    color: C.black,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  qrTrigger: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: C.black,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.red + "55",
  },

  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  listEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#AAA",
  },
  listCountBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: C.red + "18",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: C.red + "44",
  },
  listCount: { color: C.red, fontSize: 12, fontWeight: "800" },
  listContent: { paddingHorizontal: 16, paddingBottom: 120, gap: 10 },
});
