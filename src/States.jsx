import { create } from "zustand";

export const useNavigationStore = create((set) => ({
    focus: 'sun',
    analyse: true,
    active: false,

    setFocus: (item) => set({ focus: item }),
    toggleAnalyse: () => set((state) => ({ analyse: !state.analyse }) ),

    setActiveTrue: (bool) => set({ active: true }),
    setActiveFalse: (bool) => set({ active: false }),
}))

export const useSoundStore = create((set) => ({
    isPlay: false,
    isMute: false,
    isHarmony: false,
    toggle: { hour: false, timber: false, brittle: false, deep: false, bramble: false },

    setPlaying: () => set({ isPlay: true }),
    setMute: (bool) => set({ isMute: bool }),
    toggleHarmony: () => set((state) => ({ isHarmony: !state.isHarmony  }) ),
    toggleInstrument: (planet) => set((state) => ({ ...state, toggle: {...state.toggle, [planet]: !state.toggle[planet]}  }) ),
    
}))