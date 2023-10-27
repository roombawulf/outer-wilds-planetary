import { IconHeadphones, IconHeadphonesOff } from "@tabler/icons-react";
import { useSoundStore } from "../../../States";
import ButtonIcon from "../../menu/button-icon/ButtonIcon";

function Mute(){
    const isMute = useSoundStore((state) => state.isMute)
    const toggleMute = useSoundStore((state) => state.toggleMute)

    return(
        <ButtonIcon onClick={() => toggleMute()}>
            {isMute
                ? <IconHeadphonesOff size={"100%"} color="var(--ui-white)" />
                : <IconHeadphones size={"100%"} color="var(--ui-orange)" />
            }
        </ButtonIcon>
    )
}
export default Mute