import { useEffect } from "react";
import { create } from "zustand";

export const useUIStore = create((set) => ({
    isMobile: window.innerWidth < 786,
    setMobile: (bool) => set({ isMobile: bool })
}))

export const useSolarSystemStore = create((set) => ({
    focus: 'timber',
    analyse: true,
    active: false,
    quantumObserved: false,

    setFocus: (item) => set({ focus: item }),
    setQuantumObserved: (bool) => set({ quantumObserved: bool })
}))

export const useSoundStore = create((set) => ({
    isPlay: false,
    isMute: false,
    isHarmony: false,
    toggle: { hour: false, timber: false, brittle: false, deep: false, bramble: false },

    setPlaying: () => set({ isPlay: true }),
    toggleMute: () => set((state) => ({ isMute: !state.isMute })),
    toggleHarmony: () => set((state) => ({ isHarmony: !state.isHarmony  }) ),
    toggleInstrument: (planet) => set((state) => ({ ...state, toggle: {...state.toggle, [planet]: !state.toggle[planet]}  }) ),
    
}))