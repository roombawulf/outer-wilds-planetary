import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

import { Curtain } from "./curtain/Curtain";
import Information from "./information/Information";
import Navigation from "./navigation/Navigation";
import SignalScope from "./signalscope/SignalScope";
import Mute from "./audio-controls/mute/Mute";

import "./ui.scss"
import { useEffect } from "react";


function UI({ mobileMode }) {

    const [active, setActive] = useState()
    const navRef = useRef(null)

    useLayoutEffect(() => {
        gsap.to(navRef.current, {
            height: active ? '100%' : '10%'
        })
    }, [active])

    useEffect(() => console.log(navRef.current))

    return(
        <>
            <Curtain />

            <div className={`navbar ${mobileMode ? `nav-mobile` : `nav-desktop`}`}>
                <button className="menu-button" onClick={() => setActive(!active)}> O </button>

                <Navigation mobileMode={mobileMode} ref={navRef}/>
                <div style={{ flex: 1 }} />
                <Mute />
            </div>

            <Information />

            <SignalScope />
        </>
    )
}
export default UI