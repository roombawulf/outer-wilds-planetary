import { useNavigationStore } from "../States";

import AshTwin from "../planets/AshTwin";
import BrittleHollow from "../planets/BrittleHollow";
import EmberTwin from "../planets/EmberTwin";
import TimberHearth from "../planets/TimberHearth";
import GiantsDeep from "../planets/GiantsDeep";
import DarkBramble from "../planets/DarkBramble";

function Planets(){

    const focus = useNavigationStore((state) => state.focus)

    return(
        <>
            {/* Sun */}
            <mesh visible={focus === "sun"} name="sun">
                <sphereGeometry />
                <meshLambertMaterial />
            </mesh>

            {/* Hourglass Twins */}
            <group visible={focus === "hour"} name="hour">
                <EmberTwin />
                <AshTwin />
            </group>

            {/* Timber Hearth */}
            <TimberHearth visible={focus === "timber"} scale={5} name="timber" />

            {/* Brittle Hollow */}
            <BrittleHollow visible={focus === "brittle"} scale={5} name="brittle" />

            {/* Giants Deep */}
            <GiantsDeep scale={2} visible={focus === "deep"} name="deep" />

            {/* Dark Bramble */}
            <DarkBramble visible={focus == "bramble"} name="bramble" />
        </>
    )
}

export default Planets