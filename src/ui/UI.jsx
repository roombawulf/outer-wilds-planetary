import Information from "./information/Information";
import Navigation from "./navigation/Navigation";
import SignalScope from "./audio-visualiser/signalscope/SignalScope";
import HarmonySwitch from "./audio-visualiser/switches/HarmonySwitch";
import MuteSwitch from "./audio-visualiser/switches/MuteSwitch";
import HarmonyToggler from "./audio-visualiser/toggles/HarmonyToggler";
import { Curtain, ViewSwitch } from "./curtain/Curtain";

import "./ui.scss"

function UI() {

    return(
        <>
            <Curtain />

            <Navigation/>

            <Information />

            <div className="signalscope-container">
                <SignalScope />
            </div>


            <div className="switches-container">
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
            </div>
        </>
    )
}
export default UI