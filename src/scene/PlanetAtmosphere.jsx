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

    const atmosphere = {
        hour: {
            planetR: 1.5,
            atmosphereR: 4.5,
            falloff: 3.0,
            intensity: 5.0,
            density: 0.1,
            scatter: 2.0,
            wavelength: [540,810,999],
        },
        timber: {
            planetR: 4.0,
            atmosphereR: 5.0,
            falloff: 1.0,
            intensity: 2.0,
            density: 0.01,
            scatter: 2.0,
            wavelength: [542,405,337],
        },
        brittle: {
            planetR: 0.1,
            atmosphereR: 5.0,
            falloff: 1.2,
            intensity: 1.0,
            density: 0.01,
            scatter: 0.1,
            wavelength: [476,879,359],
        },
        deep: {
            planetR: 1.5,
            atmosphereR: 5.5,
            falloff: 1.2,
            intensity: 3.0,
            density: 0.02,
            scatter: 8.0,
            wavelength: [600,430,480],
        },
        bramble: {
            planetR: 0.1,
            atmosphereR: 1.5,
            falloff: 3.0,
            intensity: 4.0,
            density: 0.01,
            scatter: 15.0,
            wavelength: [810,820,820],
        },
        quantum: {
            planetR: 0.1,
            atmosphereR: 0.75,
            falloff: 4.0,
            intensity: 6.0,
            density: 0.05,
            scatter: 15.0,
            wavelength: [810,810,835],
        }
    }

    return (
        <EffectComposer>
            <Atmosphere
                planetRadius={atmosphere[focus].planetR * 0.2}
                atmosphereRadius={atmosphere[focus].atmosphereR * 0.2}
                falloffFactor={atmosphere[focus].falloff}
                sunIntensity={atmosphere[focus].intensity}
                densityModifier={atmosphere[focus].density}
                scatteringStrength={atmosphere[focus].scatter}
                wavelength={atmosphere[focus].wavelength}
            />
            { quantumObserved && 
                <Atmosphere
                    planetPosition={_array}
                    planetRadius={atmosphere['quantum'].planetR * 0.2}
                    atmosphereRadius={atmosphere['quantum'].atmosphereR * 0.2}
                    falloffFactor={atmosphere['quantum'].falloff}
                    sunIntensity={atmosphere['quantum'].intensity}
                    densityModifier={atmosphere['quantum'].density}
                    scatteringStrength={atmosphere['quantum'].scatter}
                    wavelength={atmosphere['quantum'].wavelength}
                />
            }
        </EffectComposer>
    )
}

export default PlanetAtmosphere