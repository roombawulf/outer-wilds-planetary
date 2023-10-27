import { IconAdjustments, IconAdjustmentsOff, IconMusic, IconMusicOff } from "@tabler/icons-react";
import { useSoundStore } from "../../../States";
import ButtonIcon from "../../menu/button-icon/ButtonIcon";

export function Jam(){
    const isHarmony = useSoundStore((state) => state.isHarmony)
    const toggleHarmony = useSoundStore((state) => state.toggleHarmony)
    return(
        <ButtonIcon onClick={() => toggleHarmony()}>
            {isHarmony
                ? <IconAdjustments size={"100%"} color="var(--ui-orange)" />
                : <IconAdjustmentsOff size={"100%"} color="var(--ui-white)" />
            }
        </ButtonIcon>
    )
}

export function Instrument({planet}){
    const toggle = useSoundStore((state) => state.toggle)
    const toggleInstrument = useSoundStore((state) => state.toggleInstrument)
    return(
        <ButtonIcon onClick={() => toggleInstrument(planet)}>
            {toggle[planet]
                ? <IconMusic size={"100%"} color="var(--ui-orange)" />
                : <IconMusicOff size={"100%"} color="var(--ui-white)" />
            }
        </ButtonIcon>
    )
}