import { useState, useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import "./loadingscreen.scss"
import { useSoundStore } from "../../States";


export default function LoadingScreen(){
    const { progress, active } = useProgress()
    const [hide, setHide] = useState(false)
    const setPlaying = useSoundStore((state) => state.setPlaying)
    const buttonRef = useRef(null)
    const containerRef = useRef(null)

    const clickHandler = () => {
        setPlaying()
        setHide(true)
    }

    useEffect(() => {
        if (!active) {
            setTimeout(() => {
                const startButton = document.getElementById('start')
                startButton.classList.add("fade-in")
                startButton.style.opacity = 1
                startButton.style.pointerEvents = 'auto'
            }, 1000)
        }
    }, [active])

    useEffect(() => {
        buttonRef.current.style.pointerEvents = 'none'
    }, [hide])

    return (

        <div className={`loading-screen ${hide ? 'disabled' : ''}`} ref={containerRef}>
            <h1 className="title"> OUTER WILDS </h1>
            <h3 className="subtitle"> PLANETARY </h3>
            <div className="progress"> {Math.floor(progress)} % </div>

            <button 
            id="start"
            disabled={active} 
            onClick={clickHandler}
            ref={buttonRef}
            > 
                EXPLORE 
            </button>
        </div>
    )
}