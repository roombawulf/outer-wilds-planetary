import { useSoundStore } from "../../States";
import { MenuItem } from "./Menu";
import "./soundMenu.scss"

export function SoundMenu(){
    const isMute = useSoundStore((state) => state.isMute)
    const toggleMute = useSoundStore((state) => state.toggleMute)

    return(
        <MenuItem>
            <button className="sound-button" onClick={() => toggleMute()}>
                {isMute ? 'Unmute' : 'Mute'}
            </button>
        </MenuItem>
    )
}