import { useEffect } from "react";
import { instruments } from "../../globals/sound";
import { useSoundStore, useSolarSystemStore} from "../../States";

function useAudio(){

    const focus = useSolarSystemStore((state) => state.focus)
    const isPlay = useSoundStore((state) => state.isPlay)
    const isMute = useSoundStore((state) => state.isMute)
    const isHarmony = useSoundStore((state) => state.isHarmony)
    const toggle = useSoundStore((state) => state.toggle)

    useEffect(() => {
        if (isPlay) {
            for (const planet in instruments) {
                instruments[planet].play();
            }
        }
    }, [isPlay])

    useEffect(() => {
        if( isMute ) {
            for (const planet in instruments) {
                instruments[planet].fade(instruments[planet].volume(), 0, 1000)
            }
        }
    }, [isMute])

    useEffect(() => {
        if( !isMute && !isHarmony ) {
            for (const planet in instruments) {
                if (planet === focus) {
                    instruments[planet].fade(
                        instruments[planet].volume(),
                        0.15,
                        1000
                    );
                } else {
                    instruments[planet].fade(
                        instruments[planet].volume(),
                        0.0,
                        1000
                    );
                }
            }
        }
    },[isMute, isHarmony, focus])

    useEffect(() => {
        if (!isMute && isHarmony) {
            for (const planet in instruments) {
                if (toggle[planet]) {
                    instruments[planet].fade(
                        instruments[planet].volume(),
                        0.15,
                        1000
                    );
                } 
                else {
                    instruments[planet].fade(
                        instruments[planet].volume(),
                        0.0,
                        1000
                    );
                }
            }
        }
    }, [isHarmony, isMute, toggle])
}
export default useAudio