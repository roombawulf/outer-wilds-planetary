import { IconHeadphones, IconHeadphonesOff } from "@tabler/icons-react";
import { useSoundStore } from "../../../States";
import Toggle from "../../toggle/Toggle";

function Mute(){
    const toggleMute = useSoundStore((state) => state.toggleMute)

    return(
        <Toggle handler={toggleMute}>
            <IconHeadphonesOff size={'100%'} color="var(--ui-orange)" />
            <IconHeadphones size={'100%'} color="var(--ui-orange)" />
        </Toggle>
    )
}
export default Mute