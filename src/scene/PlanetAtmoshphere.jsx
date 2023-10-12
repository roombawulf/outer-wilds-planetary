import { EffectComposer } from "@react-three/postprocessing"
import Astmosphere from "../shaders/post-processing/atmospheric-scattering/Atmosphere";
import { useControls } from "leva";
import { useNavigationStore } from "../States";
import { useEffect } from "react";
import { useState } from "react";

function PlanetAtmosphere(){

    const params = {
        planetRadius: { sun: 0.1, hour: 0.1, timber: 4.0, brittle: 0.1, deep: 0.1, bramble: 0.1},
        atmosphereRadius: { sun: 2.0, hour: 5.0, timber: 5.0, brittle: 5.0, deep: 6.0, bramble: 1.5},
        falloffFactor: { sun: 4.0, hour: 1.0, timber: 1.0, brittle: 1.2, deep: 12.8, bramble: 3.0},
        sunIntensity: { sun: 2.0, hour: 5.0, timber: 2.0, brittle: 1.0, deep: 2.0, bramble: 4.0},
        densityModifier: { sun: 0.5, hour: 1.0, timber: 0.01, brittle: 0.01, deep: 8.5, bramble: 0.01},
        scatteringStrength: { sun: 0.01, hour: 1.0, timber: 2.0, brittle: 0.1, deep: 12.0, bramble: 15.0},
        wavelength: { sun: [550, 999, 600], hour: [584,819,999], timber: [542,405,337], brittle: [476,879,359], deep: [457,262,253], bramble: [810,820,820]},
    }

    const focus = useNavigationStore((state) => state.focus)

    return (
        <EffectComposer>
            <Astmosphere
                planetRadius={params.planetRadius[focus]}
                atmosphereRadius={params.atmosphereRadius[focus]}
                falloffFactor={params.falloffFactor[focus]}
                sunIntensity={params.sunIntensity[focus]}
                densityModifier={params.densityModifier[focus]}
                scatteringStrength={params.scatteringStrength[focus]}
                wavelength={params.wavelength[focus]}
            />
        </EffectComposer>
    )
}

export default PlanetAtmosphere