import { useState, useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import "./loadingscreen.scss"


export default function LoadingScreen(){
    const { active, loaded, total } = useProgress()
    const [hide, setHide] = useState(false)
    const buttonRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        setTimeout( () => {
            buttonRef.current.style.opacity = 1
            buttonRef.current.style.pointerEvents = 'auto'
        }, 1000)
    }, [active])

    useEffect(() => {
        buttonRef.current.style.pointerEvents = 'none'
    }, [hide])

    return (

        <div className={`loading-screen ${hide ? 'disabled' : ''}`} ref={containerRef}>
            <h1 className="title"> OUTER WILDS </h1>
            <h3 className="subtitle"> PLANETARY </h3>
            <div className="progress"> {Math.floor(loaded/total * 100)} % </div>

            <button 
            className="button"
            disabled={active} 
            onClick={() => setHide(true)}
            ref={buttonRef}
            > 
                EXPLORE 
            </button>
        </div>
    )
}