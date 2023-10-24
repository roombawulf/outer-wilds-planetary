import { useSoundStore } from "../../../States";
import CheckBox from "../../checkbox/CheckBox";

export function JamPlanet({planet}) {
    const toggleInstrument = useSoundStore((state) => state.toggleInstrument)
    return(
        <CheckBox handler={() => toggleInstrument(planet)} />
    )
}

export function JamToggle(){
    const toggleHarmony = useSoundStore((state) => state.toggleHarmony)
    return(
        <CheckBox handler={() => toggleHarmony()} />
    )
}