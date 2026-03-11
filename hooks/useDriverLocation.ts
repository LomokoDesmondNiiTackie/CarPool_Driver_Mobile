import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { Rider } from "@/component/driver/riderCard";

export interface DriverLocation {
  lat: number;
  lng: number;
}

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(metres: number): string {
  if (metres < 1000) return `${Math.round(metres)} m`;
  return `${(metres / 1000).toFixed(1)} km`;
}

export function useDriverLocation(riders: Rider[]) {
  // Default to Lapaz area as fallback
  const [location, setLocation] = useState<DriverLocation>({
    lat: 5.6037,
    lng: -0.231,
  });
  const [hasGps, setHasGps] = useState(false);
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const current = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: current.coords.latitude,
          lng: current.coords.longitude,
        });
        setHasGps(true);

        watchRef.current = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 10 },
          (pos) =>
            setLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            }),
        );
      }
    })();
    return () => {
      watchRef.current?.remove();
    };
  }, []);

  // Nearest rider: GPS-based if available, else first in list (route order)
  const nearestRider: Rider | null = (() => {
    if (!riders.length) return null;
    if (!hasGps) return riders[0];
    return riders.reduce((closest, r) => {
      const dA = haversineDistance(
        location.lat,
        location.lng,
        closest.pickup.lat,
        closest.pickup.lng,
      );
      const dB = haversineDistance(
        location.lat,
        location.lng,
        r.pickup.lat,
        r.pickup.lng,
      );
      return dB < dA ? r : closest;
    });
  })();

  const distanceToNearest = nearestRider
    ? formatDistance(
        haversineDistance(
          location.lat,
          location.lng,
          nearestRider.pickup.lat,
          nearestRider.pickup.lng,
        ),
      )
    : null;

  return { location, hasGps, nearestRider, distanceToNearest };
}
