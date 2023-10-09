import { useSoundStore } from "../../../States";
import { instruments } from "../../../globals/sound"
import Switch from "../../templates/switch/Switch";

function MuteSwitch() {

    const isPlay = useSoundStore((state) => state.isPlay);
    const setPlaying = useSoundStore((state) => state.setPlaying);

    const isMute = useSoundStore((state) => state.isMute);
    const setMute = useSoundStore((state) => state.setMute);

    const play = () => {
        for (const planet in instruments) {
            instruments[planet].play();
            setPlaying();
        }
    };

    // unmute method
    const unmute = () => {
        // start playing all tracks on first click (ONLY CALLED ONCE)
        if (!isPlay) {
            play();
        }
        setMute(false);
    };

    // mute method
    const mute = () => {
        for (const planet in instruments) {
            instruments[planet].fade(instruments[planet].volume(), 0.0, 1000);
        }
        setMute(true);
    };

    return (
        <Switch handler={isMute ? unmute : mute} svgLeft={"ui/mute.svg"} svgRight={"ui/unmute.svg"}/>
    );
}
export default MuteSwitch