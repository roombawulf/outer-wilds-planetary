import { useRef } from "react"
import { useNavigationStore } from "../../States"
import Switch from "../templates/switch/Switch"
import "./curtain.scss"

export function ViewSwitch() {
    const toggleAnalyse = useNavigationStore((state) => state.toggleAnalyse)

    const sceneChange = () => {
        const curtain = document.getElementById("curtain")
        curtain.classList.remove("scene-change")
        curtain.offsetWidth
        curtain.classList.add("scene-change")
        setTimeout( () => {
            toggleAnalyse()
        }, 500)
    }

    return (
        <Switch handler={sceneChange} svgLeft={"ui/orbit.svg"} svgRight={"ui/planet.svg"}/>
    )

}

export function Curtain() {
    const curtain = useRef()
    return(
        <div id="curtain" ref={curtain} />
    )
}