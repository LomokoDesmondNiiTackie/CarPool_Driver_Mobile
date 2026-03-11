import { Rider } from "@/component/driver/riderCard";

export const DRIVER = {
  name: "Kofi Mensah",
  busNumber: "GT-1234-24",
  busType: "Toyota Hiace X",
  route: { from: "Lapaz", to: "Circle" },
  seat: 20,
};

// Lapaz → Circle route — real Accra pickup landmarks with coordinates
const PICKUP_POINTS: { label: string; lat: number; lng: number }[] = [
  { label: "Lapaz Market",           lat:  5.6037, lng: -0.2310 },
  { label: "Lapaz Total Filling Stn",lat:  5.6021, lng: -0.2298 },
  { label: "KNUST Junction",         lat:  5.6005, lng: -0.2255 },
  { label: "Ofankor Barrier",        lat:  5.6112, lng: -0.2401 },
  { label: "Pokuase Roundabout",     lat:  5.6523, lng: -0.2641 },
  { label: "Achimota Overhead",      lat:  5.6140, lng: -0.2222 },
  { label: "Achimota Mall",          lat:  5.6160, lng: -0.2185 },
  { label: "Achimota School Junction",lat: 5.6178, lng: -0.2167 },
  { label: "Awoshie Junction",       lat:  5.5998, lng: -0.2448 },
  { label: "McCarthy Hill",          lat:  5.5942, lng: -0.2512 },
  { label: "Odorkor",                lat:  5.5886, lng: -0.2390 },
  { label: "Kaneshie First Light",   lat:  5.5621, lng: -0.2297 },
  { label: "Kaneshie Market",        lat:  5.5582, lng: -0.2268 },
  { label: "Circle (Kwame Nkrumah)",  lat:  5.5560, lng: -0.2010 },
];

export const MOCK_RIDERS: Rider[] = Array.from({ length: 14 }, (_, i) => ({
  id:       `rider-${i + 1}`,
  name: [
    "Ama Owusu",      "Kwame Asante",   "Efua Boateng",  "Yaw Darko",
    "Abena Sarpong",  "Kojo Mensah",    "Akosua Frimpong","Nana Adu",
    "Adjoa Tetteh",   "Kwabena Appiah", "Maame Asare",   "Fiifi Quaye",
    "Esi Ankrah",     "Baffour Kyei",
  ][i],
  phone:    `+233 ${20 + (i % 5)}${String(i * 7654321).padStart(7, "0").slice(0, 7)}`,
  seat:     `${String.fromCharCode(65 + Math.floor(i / 4))}-0${(i % 4) + 1}`,
  qrValue:  `carpool-rider://boarding-pass/rider-${i + 1}`,
  boarded:  false,
  pickup: PICKUP_POINTS[i],
}));