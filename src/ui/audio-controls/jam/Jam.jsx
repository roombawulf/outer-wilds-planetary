import { useSoundStore } from "../../../States";
import CheckBox from "../../checkbox/CheckBox";

export function JamToggle({planet}) {
    const toggleInstrument = useSoundStore((state) => state.toggleInstrument)
    return(
        <CheckBox handler={() => toggleInstrument(planet)} />
    )
}