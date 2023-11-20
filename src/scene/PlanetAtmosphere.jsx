import { EffectComposer, Sepia } from "@react-three/postprocessing"
import Atmosphere from "../shaders/post-processing/atmospheric-scattering/Atmosphere";
import { useSolarSystemStore } from "../States";
import { useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three'


function PlanetAtmosphere({ moon }){

    const { scene } = useThree()
    const focus = useSolarSystemStore((state) => state.focus)
    const quantumObserved = useSolarSystemStore((state) => state.quantumObserved)
    const _vector3 = useMemo(() => new THREE.Vector3(), []);
    const _array = useMemo(() => _vector3.toArray(), [])

    useFrame(() => {
        if (moon.current) {
            moon.current.getWorldPosition(_vector3);
            _vector3.toArray(_array)
        }
    })

    const params = {
        planetRadius: { hour: 1.5, timber: 4.0, brittle: 0.1, deep: 0.1, bramble: 0.1, quantum: 0.1 },
        atmosphereRadius: { hour: 4.5, timber: 5.0, brittle: 5.0, deep: 6.0, bramble: 1.5, quantum: 1.3 },
        falloffFactor: { hour: 3.0, timber: 1.0, brittle: 1.2, deep: 12.8, bramble: 3.0, quantum: 1.5 },
        sunIntensity: { hour: 5.0, timber: 2.0, brittle: 1.0, deep: 2.0, bramble: 4.0, quantum: 4.0 },
        densityModifier: { hour: 0.1, timber: 0.01, brittle: 0.01, deep: 8.5, bramble: 0.01, quantum: 0.01 },
        scatteringStrength: { hour: 2.0, timber: 2.0, brittle: 0.1, deep: 12.0, bramble: 15.0, quantum: 15.0 },
        wavelength: { hour: [540,810,999], timber: [542,405,337], brittle: [476,879,359], deep: [457,262,253], bramble: [810,820,820], quantum: [810,810,835] },
    }

    return (
        <EffectComposer>
            <Atmosphere
                planetRadius={params.planetRadius[focus] * 0.2}
                atmosphereRadius={params.atmosphereRadius[focus] * 0.2}
                falloffFactor={params.falloffFactor[focus]}
                sunIntensity={params.sunIntensity[focus]}
                densityModifier={params.densityModifier[focus]}
                scatteringStrength={params.scatteringStrength[focus]}
                wavelength={params.wavelength[focus]}
            />
            { quantumObserved && 
                <Atmosphere
                    planetPosition={_array}
                    planetRadius={params.planetRadius['quantum'] * 0.2}
                    atmosphereRadius={params.atmosphereRadius['quantum'] * 0.2}
                    falloffFactor={params.falloffFactor['quantum']}
                    sunIntensity={params.sunIntensity['quantum']}
                    densityModifier={params.densityModifier['quantum']}
                    scatteringStrength={params.scatteringStrength['quantum']}
                    wavelength={params.wavelength['quantum']}
                />
            }
        </EffectComposer>
    )
}

export default PlanetAtmosphere