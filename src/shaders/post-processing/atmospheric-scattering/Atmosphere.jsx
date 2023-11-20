import { useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { AtmosphereEffect } from "./AtmosphereEffect";
import { useEffect } from "react";

function Atmosphere({
    sunPosition = [-50,0,0],
    planetPosition = [0,0,0],
    planetRadius,
    atmosphereRadius,
    falloffFactor,
    sunIntensity,
    densityModifier,
    scatteringStrength,
    wavelength = [450, 560, 720],
}) {
    const api = useRef();
    const { scene, camera, size } = useThree();

    useEffect(() => {
        api.current.planetPosition = planetPosition
        api.current.planetRadius = planetRadius
        api.current.atmosphereRadius = atmosphereRadius
        api.current.falloffFactor = falloffFactor
        api.current.sunIntensity = sunIntensity
        api.current.densityModifier = densityModifier
        api.current.scatteringStrength = scatteringStrength
        api.current.wavelength = wavelength
        api.current.mainCamera = camera
    }, [planetPosition, planetRadius, atmosphereRadius, falloffFactor, sunIntensity, densityModifier, scatteringStrength, wavelength, camera])

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
export default Atmosphere;
