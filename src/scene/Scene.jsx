import { Suspense } from "react";

import SolarSystem from "./SolarSystem";
import Stars from "./Stars";

import CamControls from "./CamControls";
import Smoke from "../shaders/materials/smoke/Smoke";
import { EffectComposer, Sepia } from "@react-three/postprocessing";

function Lights() {
    return (
        <>
            <ambientLight intensity={2.0} />
            <pointLight
                position={[-50, 0, 50]}
                intensity={2}
                color={"#ffe0a6"}
            />
        </>
    );
}

function Scene() {
    return (
        <>
            <color attach="background" args={["#050505"]} />
            <Suspense>
                <SolarSystem />
            </Suspense>

            <Lights />
            <Stars count={5000} />
            <CamControls />
        </>
    );
}
export default Scene;
