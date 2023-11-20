import { useRef } from "react";
import { useSolarSystemStore } from "../States";

import AshTwin from "./planets/AshTwin";
import BrittleHollow from "./planets/BrittleHollow";
import EmberTwin from "./planets/EmberTwin";
import TimberHearth from "./planets/TimberHearth";
import GiantsDeep from "./planets/GiantsDeep";
import DarkBramble from "./planets/DarkBramble";
import QuantumMoon from "./planets/QuantumMoon";

import PlanetAtmosphere from "./PlanetAtmosphere";

function SolarSystem(){

    const focus = useSolarSystemStore((state) => state.focus)
    const moon = useRef(null)

    return(
        <>
        <group scale={0.2}>
            {/* Hourglass Twins */}
            <group visible={focus === "hour"} name="hour">
                <EmberTwin />
                <AshTwin />
            </group>

            {/* Timber Hearth */}
            <TimberHearth visible={focus === "timber"} name="timber" />

            {/* Brittle Hollow */}
            <BrittleHollow visible={focus === "brittle"} name="brittle" />

            {/* Giants Deep */}
            <GiantsDeep visible={focus === "deep"} name="deep" />

            {/* Dark Bramble */}
            <DarkBramble visible={focus == "bramble"} name="bramble" />

            {/* Quantum Moon */}
            <QuantumMoon name="quantum" ref={moon} />
        </group>

        <PlanetAtmosphere moon={moon}/>
        </>
    )
}

export default SolarSystem