import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import '@fontsource-variable/jost';
import '@fontsource/space-mono';

import Scene from "./scene/Scene";
import UI from "./ui/UI"
import LoadingScreen from "./ui/loading-screen/LoadingScreen";
import { useUIStore } from "./States";


function App() {

    const isMobile = useUIStore((state) => state.isMobile)
    const setMobile = useUIStore((state) => state.setMobile)

    // const [isMobile, setMobile] = useState(window.innerWidth < 768)
    const handleResize = () => {
         setMobile(window.innerWidth < 768)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {window.removeEventListener('resize', handleResize)}
    },[])

    return (
        <>
            <div className="app-container">
                <UI />

                <Canvas className={isMobile ? 'mobile' : 'desktop'} camera={{fov: 25}}>
                    <Scene />
                </Canvas>

                <LoadingScreen />
            </div>

        </>
    );
}
export default App;
