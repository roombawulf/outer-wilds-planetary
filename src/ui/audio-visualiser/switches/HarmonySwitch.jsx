import { useSoundStore } from "../../../States";
import Switch from "../../templates/switch/Switch";

function HarmonySwitch() {
    const toggleHarmony = useSoundStore((state) => state.toggleHarmony);
    return (
        <Switch handler={toggleHarmony} svgLeft={"ui/note.svg"} svgRight={"ui/notes.svg"}/> 
    );
}
export default HarmonySwitch