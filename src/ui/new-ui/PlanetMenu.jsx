import { useNavigationStore } from "../../States"
import { Menu, MenuItem } from "./Menu"

export function PlanetItem({planet, label}){
    const setFocus = useNavigationStore((state) => state.setFocus)
    return(
        <MenuItem onClick={() => setFocus(planet)}>
            <span style={{display: 'inherit'}}>
                <img src={`ui/UI_${planet}.png`} width={'25px'} />
            </span>
            {label}
        </MenuItem>
    )
}

export function PlanetMenu(){
    return(
        <Menu title={"Planets"}>
            <PlanetItem planet={"hour"} label={"Hourglass Twins"} />
            <PlanetItem planet={"timber"} label={"Timber Hearth"} />
            <PlanetItem planet={"brittle"} label={"Brittle Hollow"} />
            <PlanetItem planet={"deep"} label={"Giant's Deep"} />
            <PlanetItem planet={"bramble"} label={"Dark Bramble"} />
        </Menu>
    )
}