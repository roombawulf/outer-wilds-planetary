import { useSolarSystemStore } from "../../States"
import { useMemo } from "react"
import "./information.scss"

function Information() {

    const focus = useSolarSystemStore( (state) => state.focus )
    
    const planets = useMemo(() => {
        return {
            hour: { name: "Hourglass Twins", gravity: "0.6 - 1.6x" },
            timber: { name: "Timber Hearth", gravity: " 1.0x" },
            brittle: { name: "Brittle Hollow", gravity: "0.8 - 1.1x" },
            deep: { name: "Giant's Deep", gravity: "2.0 - 3.0x" },
            bramble: { name: "Dark Bramble", gravity: " 0.4x" },
        }
    },[])

    return(
        <div className="info">
            <div className="info__icon">
                <img src={`ui/UI_${focus}.png`} />
            </div>
            <div className="info__text">
                <div className="gravity"> GRAVITY: { planets[focus].gravity } </div>
                <div className="name"> { planets[focus].name } </div>
            </div>
        </div>
    )
}
export default Information