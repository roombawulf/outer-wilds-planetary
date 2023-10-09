import { useMemo, useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Bounds, OrbitControls, useBounds } from "@react-three/drei";
import { useNavigationStore } from "../States";
import { gsap } from "gsap";

import * as THREE from "three";
import AshTwin from "../planets/AshTwin";
import BrittleHollow from "../planets/BrittleHollow";
import EmberTwin from "../planets/EmberTwin";
import TimberHearth from "../planets/TimberHearth";
import GiantsDeep from "../planets/GiantsDeep";
import DarkBramble from "../planets/DarkBramble";
import Astmosphere from "../shaders/post-processing/atmospheric-scattering/Atmosphere";
import { EffectComposer } from "@react-three/postprocessing";

function Lights() {
    return (
        <>
            <ambientLight />
            <pointLight position-x={-25} color={"orange"} intensity={2}/>
        </>
    );
}


function ReZoom({ children }) {
    
    const { scene, size } = useThree()
    const api = useBounds() 
    const focus = useNavigationStore((state) => state.focus)

    useEffect(() => {
        const planet = scene.getObjectByName(focus)
        api.refresh(planet).fit()
    },[focus, size])

    return (
        <>
            {children}
        </>
    )
}

function Atmospheric() {
    return (
        <EffectComposer>
            <Astmosphere
                planetRadius={0.1}
                atmosphereRadius={1.1}
                falloffFactor={2.0}
                sunIntensity={2}
                densityModifier={2}
                scatteringStrength={3} 
            />
        </EffectComposer>
    )
}

function Planets() {

    const focus = useNavigationStore((state) => state.focus)

    return (
        <Bounds fit clip observe margin={1.2}>
            <ReZoom>
                {/* Sun */}
                <mesh visible={focus === "sun"} name="sun">
                    <sphereGeometry />
                    <meshLambertMaterial />
                </mesh>

                {/* Hourglass Twins */}
                <group visible={focus === "hour"} name="hour">
                    <EmberTwin />
                    <AshTwin />
                </group>

                {/* Timber Hearth */}
                <TimberHearth visible={focus === "timber"} scale={5} name="timber" />

                {/* Brittle Hollow */}
                <BrittleHollow visible={focus === "brittle"} scale={5} name="brittle" />

                {/* Giants Deep */}
                <GiantsDeep visible={focus === "deep"} name="deep" />

                {/* Dark Bramble */}
                <DarkBramble visible={focus == "bramble"} name="bramble" />

            </ReZoom>
        </Bounds>
    );
}

function Scene() {
    return (
        <>
            <Planets />
            <Lights />
            <Atmospheric />
            <OrbitControls makeDefault />
        </>
    );
}
export default Scene;
