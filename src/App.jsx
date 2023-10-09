import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";

import '@fontsource-variable/jost';
import '@fontsource/space-mono';
import Scene from "./scene/Scene";
import UI from "./ui/UI"


function App() {

    return (
        <>
            <Canvas className="webgl-canvas" dpr={1.0} camera={{fov: 25}}>
                <Scene />
            </Canvas>

            <Loader />
            <UI />
        </>
    );
}
export default App;
