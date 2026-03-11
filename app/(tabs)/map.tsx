import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { UrlTile, PROVIDER_DEFAULT } from "react-native-maps";
import { ACTIVE_TILE } from "@/data/Tileproviders";
import { Locate } from "lucide-react-native";

import { useDriverLocation } from "@/hooks/useDriverLocation";
import RiderMarker from "@/component/map/ridermarker";
import DriverMarker from "@/component/map/drivermarker";
import NextRiderBanner from "@/component/map/nextriderbanner";
import RiderDetailSheet from "@/component/map/riderdetailsheet";
import QrScanner from "@/component/driver/qrScanner";
import BoardingConfirmDialog from "@/component/driver/boardingConfirmDialog";
import { Rider } from "@/component/driver/riderCard";
import { MOCK_RIDERS } from "@/data/mockRiders";
import { useMapStore } from "@/store/map.store";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

export default function DriverMapPage() {
  const {
    confirmedRider,
    setDetailVisible,
    setScannerVisible,
    setConfirmVisible,
    setConfirmedRider,
  } = useMapStore();
  const [riders, setRiders] = useState<Rider[]>(MOCK_RIDERS);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [scanningRider, setScanningRider] = useState<Rider | null>(null);

  const mapRef = useRef<MapView>(null);
  const { location, hasGps, nearestRider, distanceToNearest } =
    useDriverLocation(riders);

  const boardedCount = MOCK_RIDERS.length - riders.length;

  // ── Re-centre on driver ──
  const centreOnDriver = () => {
    mapRef.current?.animateToRegion(
      {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      600,
    );
  };

  // ── Marker tap → detail sheet ──
  const handleMarkerPress = (rider: Rider) => {
    setSelectedRider(rider);
    setDetailVisible(true);
    mapRef.current?.animateToRegion(
      {
        latitude: rider.pickup.lat,
        longitude: rider.pickup.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500,
    );
  };

  // ── Navigate — falls back to OSM web directions ──
  const handleNavigate = () => {
    if (!nearestRider) return;
    const { lat, lng } = nearestRider.pickup;
    const url =
      Platform.OS === "ios"
        ? `maps://?daddr=${lat},${lng}&dirflg=d`
        : `geo:${lat},${lng}?q=${lat},${lng}`;
    Linking.openURL(url).catch(() =>
      Linking.openURL(
        `https://www.openstreetmap.org/directions?from=${location.lat}%2C${location.lng}&to=${lat}%2C${lng}`,
      ),
    );
  };

  // ── QR scan flow ──
  const openScanner = (rider: Rider) => {
    setScanningRider(rider);
    setScannerVisible(true);
  };

  const handleScanned = (data: string) => {
    setScannerVisible(false);
    const matched = riders.find((r) => r.qrValue === data) ?? scanningRider;
    setTimeout(() => {
      setConfirmedRider(matched);
      setConfirmVisible(true);
    }, 300);
  };

  const handleConfirm = () => {
    setConfirmVisible(false);
    if (confirmedRider)
      setRiders((prev) => prev.filter((r) => r.id !== confirmedRider.id));
    setConfirmedRider(null);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>ROUTE MAP</Text>
          <Text style={styles.title}>Live Tracking</Text>
        </View>
        <View style={styles.gpsBadge}>
          <View
            style={[
              styles.gpsDot,
              { backgroundColor: hasGps ? C.green : C.red },
            ]}
          />
          <Text style={[styles.gpsText, { color: hasGps ? C.green : C.red }]}>
            {hasGps ? "GPS Live" : "GPS Off"}
          </Text>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapWrap}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_DEFAULT}
          mapType="none"
          initialRegion={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
          }}
          showsUserLocation={false}
          showsCompass={false}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsTraffic={false}
          rotateEnabled={false}
          toolbarEnabled={false}
        >
          <UrlTile
            urlTemplate={ACTIVE_TILE}
            maximumZ={19}
            flipY={false}
            tileSize={256}
            shouldReplaceMapContent
          />

          <DriverMarker lat={location.lat} lng={location.lng} />

          {riders.map((rider) => (
            <RiderMarker
              key={rider.id}
              rider={rider}
              isNearest={nearestRider?.id === rider.id}
              onPress={handleMarkerPress}
            />
          ))}
        </MapView>

        {/* Re-centre FAB */}
        <TouchableOpacity
          style={styles.locateBtn}
          onPress={centreOnDriver}
          activeOpacity={0.85}
        >
          <Locate color={C.white} size={20} />
        </TouchableOpacity>

        {/* Legend */}
        <View style={styles.legend}>
          <LegendItem color={C.green} label="You" />
          <LegendItem color={C.red} label="Next" />
          <LegendItem color={C.black} label="Riders" />
        </View>

        {/* Tile attribution */}
        <View style={styles.attribution}>
          <Text style={styles.attributionText}>
            © CARTO · © OpenStreetMap contributors
          </Text>
        </View>
      </View>

      {/* Bottom panel */}
      <View style={styles.bottomPanel}>
        <NextRiderBanner
          rider={nearestRider}
          distance={distanceToNearest}
          pendingCount={riders.length}
          boardedCount={boardedCount}
          onNavigate={handleNavigate}
        />
      </View>

      <RiderDetailSheet rider={selectedRider} onScan={openScanner} />
      <QrScanner targetRider={scanningRider} onScanned={handleScanned} />
      <BoardingConfirmDialog rider={confirmedRider} onConfirm={handleConfirm} />
    </SafeAreaView>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.black },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: C.black,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  eyebrow: {
    color: C.red,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 2,
  },
  title: {
    color: C.white,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  gpsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  gpsDot: { width: 7, height: 7, borderRadius: 4 },
  gpsText: { fontSize: 11, fontWeight: "800" },

  mapWrap: { flex: 1 },

  locateBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: C.black,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.green + "66",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },

  legend: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(17,17,17,0.88)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 7,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { color: C.white, fontSize: 11, fontWeight: "700" },

  attribution: {
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  attributionText: {
    fontSize: 9,
    color: "rgba(0,0,0,0.5)",
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  bottomPanel: { padding: 16, paddingBottom: 24, backgroundColor: "#F2F2F7" },
});
