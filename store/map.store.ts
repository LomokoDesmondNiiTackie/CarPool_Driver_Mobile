import { create } from "zustand";
import { Rider } from "@/component/driver/riderCard";
import { MOCK_RIDERS } from "@/data/mockRiders";

interface MapState {
    riders: Rider[];
    detailVisible: boolean;
    scannerVisible: boolean;
    confirmVisible: boolean;
    confirmedRider: Rider | null;

    setRiders: (value: Rider[] ) => void;
    setDetailVisible: (value: boolean) => void;
    setScannerVisible: (value: boolean) => void;
    setConfirmVisible: (value: boolean) => void;
    setConfirmedRider: (value: Rider | null) => void
}


export const useMapStore = create<MapState>((set)=> ({
    riders: MOCK_RIDERS,
    detailVisible: false,
    scannerVisible: false,
    confirmVisible: false,
    confirmedRider: null,

    setRiders: (values: Rider[]) => set({riders: values}),
    setDetailVisible: (value: boolean) => set({ detailVisible: value}),
    setScannerVisible: (value: boolean) => set({ scannerVisible: value}),
    setConfirmVisible: (value: boolean) => set({ confirmVisible: value}),
    setConfirmedRider: (value: Rider | null) => set({ confirmedRider: value})
}))