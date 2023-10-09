import { useSoundStore } from "../../../States";
import Toggle from "../../templates/toggle/Toggle";

function HarmonyToggler({ planet }) {

    const toggleInstrument = useSoundStore((state) => state.toggleInstrument);

    return (
        <Toggle handler={() => toggleInstrument(planet)} />
    );
}
export default HarmonyToggler