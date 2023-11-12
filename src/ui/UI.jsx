import { useNavigationStore, useSoundStore, useUIStore } from "../States";
import Information from "./information/Information";
import SignalScope from "./signalscope/SignalScope";

import ButtonIcon from "./menu/button-icon/ButtonIcon";
import {Jam, Instrument} from "./audio-controls/jam/Jam";
import Mute from "./audio-controls/mute/Mute"

import "./ui.scss"
import { useEffect } from "react";
import { IconPlanet } from "@tabler/icons-react";
import { useState } from "react";

function DesktopUI(){

    const setFocus = useNavigationStore((state) => state.setFocus)
    const isHarmony = useSoundStore((state) => state.isHarmony)
    return(
        <>
        <div className="audio-ctrls">
            <div className="desktop-menu">
                <Mute />
                <Jam />
            </div>
        </div>

        <div className="planet-nav">
            <div className="desktop-menu">
                <ButtonIcon icon={"ui/UI_CaveTwin.png"} onClick={() => setFocus('hour')} />
                <ButtonIcon icon={"ui/UI_TimberHearth.png"} onClick={() => setFocus('timber')} />
                <ButtonIcon icon={"ui/UI_BrittleHollow.png"} onClick={() => setFocus('brittle')} />
                <ButtonIcon icon={"ui/UI_GiantsDeep.png"} onClick={() => setFocus('deep')} />
                <ButtonIcon icon={"ui/UI_DarkBramble.png"} onClick={() => setFocus('bramble')} />
            </div>
        </div>

        {isHarmony && 
        <div className="jam-ctrls">
        <div className="desktop-menu">
            <Instrument planet={"hour"} color={'yellow'} />
            <Instrument planet={"timber"} color={'green'}/>
            <Instrument planet={"brittle"} color={'purple'} />
            <Instrument planet={"deep"} color={'blue'}/>
            <Instrument planet={"bramble"} color={'brown'}/>
        </div>
        </div>
        }       
        </>
    )
}

function MobileUI(){

    const [open, setOpen] = useState(false)
    const focus = useNavigationStore((state) => state.focus)
    const setFocus = useNavigationStore((state) => state.setFocus)

    // useEffect(() => {
    //     setOpen(!open)
    // },[focus])

    return(
        <>
            <ButtonIcon onClick={() => setOpen(!open)} className="menu-button">
                <IconPlanet size={"100%"} color="var(--ui-white)"/>
            </ButtonIcon>
            {open &&
            <div className="planet-list">
                <ButtonIcon icon={"ui/UI_CaveTwin.png"} onClick={() => setFocus('hour')}>
                    Hourglass Twins
                </ButtonIcon>
                <ButtonIcon icon={"ui/UI_TimberHearth.png"} onClick={() => setFocus('timber')}>
                    Timber Hearth
                </ButtonIcon>
                <ButtonIcon icon={"ui/UI_BrittleHollow.png"} onClick={() => setFocus('brittle')}>
                    Brittle Hollow
                </ButtonIcon>
                <ButtonIcon icon={"ui/UI_GiantsDeep.png"} onClick={() => setFocus('deep')}>
                    Giants Deep
                </ButtonIcon>
                <ButtonIcon icon={"ui/UI_DarkBramble.png"} onClick={() => setFocus('bramble')}>
                    Dark Bramble
                </ButtonIcon>
            </div>
            }
        </>
    )
}

function UI() {

    const isMobile = useUIStore((state) => state.isMobile)
    const setMobile = useUIStore((state) => state.setMobile)

    const onResize = (e) => {
        setMobile(window.innerWidth < 768)
    }
    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    },[])

    return(
        <>
            {!isMobile ? <DesktopUI/> : <MobileUI />}
            <Information />
            <SignalScope />
        </>
    )
}
export default UI