import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useSoundStore } from "../../States";
import { MenuItem } from "./Menu";
import "./soundMenu.scss"

function InstrumentToggle({planet, title}){

    const instrument = useSoundStore((state) => state.toggle)
    const toggleInstrument = useSoundStore((state) => state.toggleInstrument)
    const button = useRef(null)
    const icon = useRef(null)

    useEffect(() => {
        gsap.to(icon.current, {
            filter: instrument[planet] ? "grayscale(0%)" : "grayscale(100%)",
            opacity: instrument[planet] ? 1.0 : 0.25,
            duration: 0.2,
        })
    }, [instrument[planet]])

    return(
        <button className="instrument-button" title={title} onClick={() => toggleInstrument(planet)} ref={button}>
            <span>
                <img
                width={"30px"}
                className="instrument-button__icon"
                src={`ui/UI_${planet}.png`} 
                aria-label={planet} 
                alt={`${planet} instrument toggle`} 
                ref={icon}
                />
            </span>
        </button>
    )

}

export function SoundMenu(){
    const isMute = useSoundStore((state) => state.isMute)
    const toggleMute = useSoundStore((state) => state.toggleMute)

    const isHarmony = useSoundStore((state) => state.isHarmony)
    const toggleHarmony = useSoundStore((state) => state.toggleHarmony)

    useEffect(() => {
        gsap.to(".instruments-panel", {
            opacity: isHarmony ? '100%' : '25%',
            pointerEvents: isHarmony ? 'inherit' : 'none',
            duration: 0.2
        })
    }, [isHarmony])

    return(
        <>
            <MenuItem>
                <button className="sound-button" onClick={() => toggleMute()}>
                    {isMute ? 'Unmute' : 'Mute'}
                </button>
            </MenuItem>
            <MenuItem>
                <button className="sound-button" onClick={() => toggleHarmony()}>
                    {isHarmony ? 'Jam Mode' : 'Solo Mode'}
                </button>
            </MenuItem>
            <MenuItem>
                <div className="instruments-panel">
                    <InstrumentToggle planet={"hour"} title={"Hourglass Twins"} />
                    <InstrumentToggle planet={"timber"} title={"Timber Hearth"} />
                    <InstrumentToggle planet={"brittle"} title={"Brittle Hollow"} />
                    <InstrumentToggle planet={"deep"} title={"Giant's Deep"} />
                    <InstrumentToggle planet={"bramble"} title={"Dark Bramble"} />
                    <InstrumentToggle planet={"quantum"} title={"Quantum Moon"} />
                </div> 
            </MenuItem>
        </>
    )
}