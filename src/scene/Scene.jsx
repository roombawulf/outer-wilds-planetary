import { OrbitControls } from "@react-three/drei";

import Planets from "./Planets";
import PlanetAtmosphere from "./PlanetAtmoshphere";
import CameraBounds from "./CameraBounds";
import { Perf } from "r3f-perf";

function Lights() {
    return (
        <>
            <ambientLight intensity={0.1}/>
            <pointLight position-x={-25} intensity={2}/>
        </>
    );
}

function Scene() {
    return (
        <>
            <CameraBounds>
                <Planets />
            </CameraBounds>
            
            <PlanetAtmosphere />
            <Lights />

            <OrbitControls makeDefault />
        </>
    );
}
export default Scene;
