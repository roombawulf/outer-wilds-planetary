import Information from "./information/Information";
import Navigation from "./navigation/Navigation";
import SignalScope from "./audio-visualiser/signalscope/SignalScope";
import HarmonySwitch from "./audio-visualiser/switches/HarmonySwitch";
import MuteSwitch from "./audio-visualiser/switches/MuteSwitch";
import HarmonyToggler from "./audio-visualiser/toggles/HarmonyToggler";
import { Curtain, ViewSwitch } from "./curtain/Curtain";

import "./ui.scss"
import { useState } from "react";
import { useEffect } from "react";
import Toggle from "./toggle/Toggle";

import { IconHeadphones, IconHeadphonesOff } from "@tabler/icons-react"


function DesktopUI() {
    return (
        <div className="navbar">
            <Navigation />
            <Toggle>
                <IconHeadphones size={'100%'} color="var(--ui-orange)"/>
                <IconHeadphonesOff size={'100%'} color="var(--ui-orange)" />
            </Toggle>
        </div>
    )
}

function UI() {

    const [mobile, setMobile] = useState(false)
    const handleResize = () => {
        window.innerWidth < 600 ? setMobile(true) : setMobile(false)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {window.removeEventListener('resize', handleResize)}
    },[])

    return(
        <>
            <Curtain />

            <DesktopUI />

            <Information />

            <SignalScope />


            {/* <div className="switches-container">
                <MuteSwitch />
                <HarmonySwitch />
                <ViewSwitch />
            </div>

            <div className="toggles-container">
                <HarmonyToggler planet={"hour"} />
                <HarmonyToggler planet={"timber"} />
                <HarmonyToggler planet={"brittle"} />
                <HarmonyToggler planet={"deep"} />
                <HarmonyToggler planet={"bramble"} />
            </div> */}
        </>
    )
}
export default UI