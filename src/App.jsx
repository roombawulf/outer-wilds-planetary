import { Canvas } from "@react-three/fiber";
import Scene from "./scene/Scene";
import UI from "./ui/UI"
import LoadingScreen from "./ui/loading-screen/LoadingScreen";

import '@fontsource-variable/jost';
import '@fontsource/space-mono';

function App() {

    return (
        <>
            <Canvas className="three-canvas" dpr={1.0} camera={{fov: 25}}>
                <Scene />
            </Canvas>

            <UI />
            <LoadingScreen />
        </>
    );
}
export default App;
