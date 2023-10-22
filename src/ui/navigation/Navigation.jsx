import { useNavigationStore } from "../../States"
import "./navigation.scss"

function Navigation(){
    return(
        <ul className="planet-list">
            <li>
                <image className="planet-icon" src="ui/UI_TimberHearth.png" />
            </li>
            <li>
                <image className="planet-icon" src="ui/UI_Sun.png" />
            </li>
            <li>
                <image className="planet-icon" src="ui/UI_Sun.png" />
            </li>
        </ul>
    )
}
export default Navigation