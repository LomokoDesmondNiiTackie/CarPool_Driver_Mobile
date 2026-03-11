import { View, Text, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Rider } from "@/component/driver/riderCard";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Props {
  rider: Rider;
  isNearest: boolean;
  onPress: (rider: Rider) => void;
}

export default function RiderMarker({ rider, isNearest, onPress }: Props) {
  const initials = rider.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Marker
      coordinate={{ latitude: rider.pickup.lat, longitude: rider.pickup.lng }}
      onPress={() => onPress(rider)}
      tracksViewChanges={false}
    >
      <View style={styles.wrap}>
        {/* Pulse ring for nearest */}
        {isNearest && <View style={styles.pulse} />}

        {/* Pin bubble */}
        <View style={[styles.bubble, isNearest && styles.bubbleNearest]}>
          <Text style={[styles.initials, isNearest && styles.initialsNearest]}>
            {initials}
          </Text>
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center" },
  pulse: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.red,
    opacity: 0.2,
    top: -6,
  },
  bubble: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: C.white,
    borderWidth: 2.5,
    borderColor: C.black,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
  bubbleNearest: {
    backgroundColor: C.red,
    borderColor: C.white,
    width: 46,
    height: 46,
    borderRadius: 15,
  },
  initials: {
    fontSize: 13,
    fontWeight: "800",
    color: C.black,
  },
  initialsNearest: {
    color: C.white,
    fontSize: 14,
  },
 
});
