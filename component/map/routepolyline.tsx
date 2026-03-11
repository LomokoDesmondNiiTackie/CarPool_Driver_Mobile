import { Polyline } from "react-native-maps";
import { Rider } from "@/component/driver/riderCard";
import { DriverLocation } from "@/hooks/useDriverLocation";

const C = { red: "#ff5a5f", green: "#058c42" };

interface Props {
  driverLocation: DriverLocation;
  riders: Rider[];
  nearestRider: Rider | null;
}

export default function RoutePolyline({
  driverLocation,
  riders,
  nearestRider,
}: Props) {
  if (!riders.length) return null;

  // Full route: driver → all pending riders in order
  const allCoords = [
    { latitude: driverLocation.lat, longitude: driverLocation.lng },
    ...riders.map((r) => ({ latitude: r.pickup.lat, longitude: r.pickup.lng })),
  ];

  // Highlighted segment: driver → nearest rider
  const nextCoords = nearestRider
    ? [
        { latitude: driverLocation.lat, longitude: driverLocation.lng },
        {
          latitude: nearestRider.pickup.lat,
          longitude: nearestRider.pickup.lng,
        },
      ]
    : [];

  return (
    <>
      {/* Dashed full route in muted red */}
      <Polyline
        coordinates={allCoords}
        strokeColor={C.red + "55"}
        strokeWidth={3}
        lineDashPattern={[8, 6]}
      />

      {/* Solid bright segment to nearest rider */}
      {nextCoords.length > 0 && (
        <Polyline
          coordinates={nextCoords}
          strokeColor={C.green}
          strokeWidth={5}
          lineCap="round"
          lineJoin="round"
        />
      )}
    </>
  );
}
