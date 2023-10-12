import { Perf } from "r3f-perf";

import Planets from "./Planets";
import PlanetAtmosphere from "./PlanetAtmoshphere";

import CamControls from "./CamControls";
import CameraBounds from "./CameraBounds";

function Lights() {
    return (
        <>
            <ambientLight intensity={0.5}/>
            <pointLight position={[-50, 0, 50]} intensity={2}/>
        </>
    );
}

function Scene() {

    return (
        <>
            <Planets />

            <PlanetAtmosphere />
            <Lights />

            <CamControls />
        </>
    );
}
export default Scene;
