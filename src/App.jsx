import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import '@fontsource-variable/jost';
import '@fontsource/space-mono';

import Scene from "./scene/Scene";
import UI from "./ui/UI"
import LoadingScreen from "./ui/loading-screen/LoadingScreen";


function App() {

    const [isMobile, setMobile] = useState(window.innerWidth < 768)
    const handleResize = () => {
        window.innerWidth < 786 ? setMobile(true) : setMobile(false)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {window.removeEventListener('resize', handleResize)}
    },[])

    return (
        <>
            <div className="app-container">
                <UI mobileMode={isMobile} />

                <Canvas className={isMobile ? 'mobile' : 'desktop'} camera={{fov: 25}}>
                    <Scene />
                </Canvas>

                <LoadingScreen />
            </div>

        </>
    );
}
export default App;
