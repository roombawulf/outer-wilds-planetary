import { useState, useRef, useLayoutEffect } from "react";
import { useUIStore } from "../States";
import { gsap } from "gsap";

import { Curtain } from "./curtain/Curtain";
import Information from "./information/Information";
import Navigation from "./navigation/Navigation";
import SignalScope from "./signalscope/SignalScope";
import Mute from "./audio-controls/mute/Mute";

import "./ui.scss"


function UI() {

    const isMobile = useUIStore((state) => state.isMobile)
    const [active, setActive] = useState(false)
    const nav = useRef(null)

    // useLayoutEffect(() => {
    //     gsap.to(nav.current, {
    //         height: active ? '100%' : '22px'
    //     })
    // }, [active])
    

    return(
        <>
            <Curtain />
            <div className={`nav-container ${isMobile ? `m` : null}`}>
                { isMobile && 
                        <button 
                            onClick={() => setActive(!active)}
                            className="nav-button"
                        > Click 
                        </button> 
                }
                <nav className={`navbar ${isMobile ? `nav-mobile` : `nav-desktop`}`} ref={nav}>
                    
                    <Navigation />
                    <div style={{ flex: 1 }} />
                    <Mute />
                </nav>
            </div>

            <Information />

            <SignalScope />
        </>
    )
}
export default UI