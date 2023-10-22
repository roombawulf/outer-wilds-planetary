import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import '@fontsource-variable/jost';
import '@fontsource/space-mono';

import Scene from "./scene/Scene";
import UI from "./ui/UI"
import LoadingScreen from "./ui/loading-screen/LoadingScreen";


function App() {

    return (
        <>
            <Canvas className="webgl-canvas" camera={{fov: 25}}>
                <Scene />
            </Canvas>

            <LoadingScreen />
            <UI />
        </>
    );
}
export default App;
