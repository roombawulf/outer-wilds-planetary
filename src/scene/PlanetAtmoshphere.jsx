import { EffectComposer } from "@react-three/postprocessing"
import Astmosphere from "../shaders/post-processing/atmospheric-scattering/Atmosphere";
import { useControls } from "leva";
import { useNavigationStore } from "../States";
import { useEffect } from "react";
import { useState } from "react";

function PlanetAtmosphere(){

    const params = {
        planetRadius: { sun: 0.1, ember: 0.1, timber: 0.5, brittle: 0.1, deep: 0.1, bramble: 0.1},
        atmosphereRadius: { sun: 2.0, ember: 2.2, timber: 1.8, brittle: 1.7, deep: 2.5, bramble: 1.75},
        falloffFactor: { sun: 4.0, ember: 3.0, timber: 9.2, brittle: 1.2, deep: 12.8, bramble: 12.8},
        sunIntensity: { sun: 2.0, ember: 5.0, timber: 4.0, brittle: 1.0, deep: 2.0, bramble: 4.0},
        densityModifier: { sun: 0.5, ember: 0.5, timber: 1.5, brittle: 0.01, deep: 8.5, bramble: 5.0},
        scatteringStrength: { sun: 0.01, ember: 0.2, timber: 3.0, brittle: 0.1, deep: 12.0, bramble: 15.0},
        wavelength: { sun: [550, 999, 600], ember: [584,819,999], timber: [542,405,337], brittle: [476,879,359], deep: [457,262,253], bramble: [688,820,820]},
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