import { useEffect } from "react";
import { instruments } from "../../globals/sound";
import { useSoundStore, useNavigationStore} from "../../States";

function useAudio(){

    const focus = useNavigationStore((state) => state.focus)
    const isPlay = useSoundStore((state) => state.isPlay)
    const isMute = useSoundStore((state) => state.isMute)
    const isHarmony = useSoundStore((state) => state.isHarmony)
    const toggle = useSoundStore((state) => state.toggle)

    useEffect(() => {
        if (isPlay) {
            for (const planet in instruments) {
                instruments[planet].play();
            }
            instruments[focus].fade(instruments[focus].volume(), 0.15, 1000)
        }
    }, [isPlay])

    useEffect(() => {
        console.log(isMute)
        if( isMute ) {
            for (const planet in instruments) {
                instruments[planet].fade(instruments[planet].volume(), 0, 1000)
            }
        }
    }, [isMute])

    useEffect(() => {
        if( !isMute ) {
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
    },[isMute, focus])

    // // orchestrate sounds method
    // const orchestrate = () => {
    //     for (const planet in instruments) {
    //         if (toggle[planet]) {
    //             instruments[planet].fade(
    //                 instruments[planet].volume(),
    //                 0.15,
    //                 1000
    //             );
    //         } else {
    //             instruments[planet].fade(
    //                 instruments[planet].volume(),
    //                 0.0,
    //                 1000
    //             );
    //         }
    //     }
    // };

}

export default useAudio