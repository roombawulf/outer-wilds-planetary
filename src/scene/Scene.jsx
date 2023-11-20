import { Suspense } from "react";

import SolarSystem from "./SolarSystem";
import Stars from "./Stars";

import CamControls from "./CamControls";

function Lights() {
    return (
        <>
            <ambientLight intensity={0.5}/>
            <pointLight position={[-50, 0, 50]} intensity={2} color={'#ffe0a6'}/>
        </>
    );
}

function Scene() {

    return (
        <>

            <Suspense>
                <SolarSystem />
            </Suspense>

            <Lights />
            <Stars count={1500} />

            <CamControls />
        </>
    );
}
export default Scene;
