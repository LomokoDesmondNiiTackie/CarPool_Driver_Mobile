import { View, Text, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Props {
  lat: number;
  lng: number;
}

export default function DriverMarker({ lat, lng }: Props) {
  return (
    <Marker
      coordinate={{ latitude: lat, longitude: lng }}
      tracksViewChanges={false}
    >
      <View style={styles.wrap}>
        <View style={styles.ring}>
          <View style={styles.inner}>
            <Text style={styles.icon}>🚌</Text>
          </View>
        </View>
        <View style={styles.tail} />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center" },
  ring: {
    width: 52,
    height: 52,
    borderRadius: 18,
    // backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: C.white,
    // shadowColor: C.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  inner: { alignItems: "center", justifyContent: "center" },
  icon: { fontSize: 24 },
  tail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    // borderTopColor: C.green,
    marginTop: -1,
  },
});
