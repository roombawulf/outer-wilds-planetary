import { useNavigationStore, useSoundStore } from "../States";
import Information from "./information/Information";
import SignalScope from "./signalscope/SignalScope";
import DesktopMenu from "./menu/desktop-menu/DesktopMenu";

import ButtonIcon from "./menu/button-icon/ButtonIcon";
import Mute from "./audio-controls/mute/Mute"
import {Jam, Instrument} from "./audio-controls/jam/Jam";

import "./ui.scss"


function UI() {

    const setFocus = useNavigationStore((state) => state.setFocus)

    return(
        <>

            <div className="menu-container">

                <DesktopMenu>
                    <Mute />
                    <Jam />
                </DesktopMenu>

                <DesktopMenu>
                    <ButtonIcon icon={"ui/UI_Sun.png"} onClick={() => setFocus('sun')} />
                    <ButtonIcon icon={"ui/UI_CaveTwin.png"} onClick={() => setFocus('hour')} />
                    <ButtonIcon icon={"ui/UI_TimberHearth.png"} onClick={() => setFocus('timber')} />
                    <ButtonIcon icon={"ui/UI_BrittleHollow.png"} onClick={() => setFocus('brittle')} />
                    <ButtonIcon icon={"ui/UI_GiantsDeep.png"} onClick={() => setFocus('deep')} />
                    <ButtonIcon icon={"ui/UI_DarkBramble.png"} onClick={() => setFocus('bramble')} />
                </DesktopMenu>

                <DesktopMenu>
                    <ButtonIcon icon={"ui/UI_DarkBramble.png"} onClick={() => toggleMute()} />
                </DesktopMenu>

                <DesktopMenu>
                    <Instrument planet={"hour"} />
                    <Instrument planet={"timber"} />
                    <Instrument planet={"brittle"} />
                    <Instrument planet={"deep"} />
                    <Instrument planet={"bramble"} />
                </DesktopMenu>
            </div>

            


            <Information />
            <SignalScope />
        </>
    )
}
export default UI