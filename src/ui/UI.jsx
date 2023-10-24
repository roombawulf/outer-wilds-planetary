import Information from "./information/Information";
import Navigation from "./navigation/Navigation";
import SignalScope from "./signalscope/SignalScope";
import { Curtain } from "./curtain/Curtain";

import "./ui.scss"
import { useState } from "react";
import { useEffect } from "react";
import Toggle from "./toggle/Toggle";
import Mute from "./audio-controls/mute/Mute";

function DesktopUI() {
    return (
        <div className="navbar">
            <Navigation />
            <div style={{ flex: 1 }} />
            <Mute />
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