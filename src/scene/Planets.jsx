import { useThree } from "@react-three/fiber";
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
        <group scale={0.2}>
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
            <TimberHearth visible={focus === "timber"} name="timber" />

            {/* Brittle Hollow */}
            <BrittleHollow visible={focus === "brittle"} name="brittle" />

            {/* Giants Deep */}
            <GiantsDeep visible={focus === "deep"} name="deep" />

            {/* Dark Bramble */}
            <DarkBramble visible={focus == "bramble"} name="bramble" />
        </group>
    )
}

export default Planets