import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { X, AlertTriangle } from "lucide-react-native";
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
  targetRider: Rider | null;
  onScanned: (data: string) => void;
}

const VF = 220;
const CORNER = 22;
const THICK = 3;

export default function QrScanner({
  targetRider,
  onScanned,
}: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scannedRef = useRef(false);
  const { scannerVisible, setScannerVisible } = useMapStore();


  useEffect(() => {
    if (scannerVisible) {
      scannedRef.current = false;
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [scannerVisible, fadeAnim]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scannedRef.current) return;
    scannedRef.current = true;
    onScanned(data);
  };

  return (
    <Modal
      transparent
      visible={scannerVisible}
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View style={[styles.bg, { opacity: fadeAnim }]}>
        {/* Camera */}
        {permission?.granted ? (
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          />
        ) : (
          <View style={styles.noCameraWrap}>
            <AlertTriangle color={C.red} size={40} />
            <Text style={styles.noCameraText}>Camera permission required</Text>
            <TouchableOpacity
              style={styles.permBtn}
              onPress={requestPermission}
            >
              <Text style={styles.permBtnText}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Overlay */}
        <View style={styles.overlay}>
          {/* Top bar */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setScannerVisible(false)}>
              <X color={C.white} size={20} />
            </TouchableOpacity>
            <View style={styles.titleWrap}>
              <Text style={styles.eyebrow}>SCAN RIDER</Text>
              <Text style={styles.title}>
                {targetRider ? targetRider.name : "Any Rider"}
              </Text>
            </View>
            <View style={{ width: 40 }} />
          </View>

          {/* Viewfinder */}
          <View style={styles.viewfinderWrap}>
            <View style={styles.viewfinder}>
              <View style={[styles.corner, styles.cTL]} />
              <View style={[styles.corner, styles.cTR]} />
              <View style={[styles.corner, styles.cBL]} />
              <View style={[styles.corner, styles.cBR]} />
            </View>
            <Text style={styles.hint}>Align QR code within the frame</Text>
          </View>

          {/* Target rider info */}
          {targetRider && (
            <View style={styles.riderInfo}>
              <View style={styles.riderAvatar}>
                <Text style={styles.riderInitials}>
                  {targetRider.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
              <View>
                <Text style={styles.riderName}>{targetRider.name}</Text>
                <Text style={styles.riderPhone}>{targetRider.phone}</Text>
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: "#000" },
  noCameraWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  noCameraText: { color: C.white, fontSize: 16, fontWeight: "700" },
  permBtn: {
    backgroundColor: C.red,
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  permBtnText: { color: C.white, fontSize: 14, fontWeight: "800" },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    paddingBottom: 48,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: { alignItems: "center" },
  eyebrow: { color: C.red, fontSize: 10, fontWeight: "800", letterSpacing: 3 },
  title: { color: C.white, fontSize: 16, fontWeight: "800" },

  viewfinderWrap: { alignItems: "center", gap: 16 },
  viewfinder: { width: VF, height: VF, position: "relative" },
  corner: {
    position: "absolute",
    width: CORNER,
    height: CORNER,
    borderColor: C.red,
  },
  cTL: {
    top: 0,
    left: 0,
    borderTopWidth: THICK,
    borderLeftWidth: THICK,
    borderTopLeftRadius: 6,
  },
  cTR: {
    top: 0,
    right: 0,
    borderTopWidth: THICK,
    borderRightWidth: THICK,
    borderTopRightRadius: 6,
  },
  cBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: THICK,
    borderLeftWidth: THICK,
    borderBottomLeftRadius: 6,
  },
  cBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: THICK,
    borderRightWidth: THICK,
    borderBottomRightRadius: 6,
  },
  hint: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: "500" },

  riderInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "rgba(0,0,0,0.7)",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  riderAvatar: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
  },
  riderInitials: { color: C.white, fontSize: 15, fontWeight: "800" },
  riderName: { color: C.white, fontSize: 15, fontWeight: "800" },
  riderPhone: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
});
