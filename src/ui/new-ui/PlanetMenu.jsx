import { useSolarSystemStore } from "../../States"
import { MenuItem } from "./Menu"
import "./planetMenu.scss"

export function PlanetItem({planet, label}){
    const setFocus = useSolarSystemStore((state) => state.setFocus)
    return(
        <MenuItem>
            <button onClick={() => setFocus(planet)} className="planet-button">
                <span>{label}</span>
            </button>
        </MenuItem>
    )
}

export function PlanetMenu(){
    return(
        <>
            <PlanetItem planet={"hour"} label={"Hourglass Twins"} />
            <PlanetItem planet={"timber"} label={"Timber Hearth"} />
            <PlanetItem planet={"brittle"} label={"Brittle Hollow"} />
            <PlanetItem planet={"deep"} label={"Giant's Deep"} />
            <PlanetItem planet={"bramble"} label={"Dark Bramble"} />
        </>
    )
}