import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AtmosphereEffect } from "./AtmosphereEffect";
import { useEffect } from "react";
import { BlendFunction } from "postprocessing";
import * as THREE from 'three';

function Astmosphere({
    sunPosition = new THREE.Vector3(-50,0,0),
    planetPosition = new THREE.Vector3(0,0,0),
    planetRadius,
    atmosphereRadius,
    falloffFactor,
    sunIntensity,
    densityModifier,
    scatteringStrength,
    wavelength = new THREE.Vector3(450, 560, 720),
}) {
    const api = useRef();
    const { scene, camera, size } = useThree();

    useEffect(() => {
        api.current.planetRadius = planetRadius
        api.current.atmosphereRadius = atmosphereRadius
        api.current.falloffFactor = falloffFactor
        api.current.sunIntensity = sunIntensity
        api.current.densityModifier = densityModifier
        api.current.scatteringStrength = scatteringStrength
        api.current.wavelength = wavelength
        api.current.mainCamera = camera
    }, [planetRadius, atmosphereRadius, falloffFactor, sunIntensity, densityModifier, scatteringStrength, wavelength, camera])

    const effect = useMemo(
        () =>
            new AtmosphereEffect(
                scene,
                camera,
                sunPosition,
                planetPosition,
                planetRadius,
                atmosphereRadius,
                falloffFactor,
                sunIntensity,
                densityModifier,
                scatteringStrength, 
                wavelength
            ),
        []
    );
    return <primitive object={effect} ref={api} />;
}
export default Astmosphere;
