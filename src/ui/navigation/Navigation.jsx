import { forwardRef } from "react"
import { useNavigationStore } from "../../States"
import "./navigation.scss"

const Navigation = forwardRef(function Navigation({ mobileMode }, ref){

    const setFocus = useNavigationStore((state) => state.setFocus)

    return(
        <ul className={`planet-list ${mobileMode ? `mobile-list` : `desktop-list`}`} ref={ref}>
            <li onClick={() => setFocus("sun")}>
                <img className="planet-icon" src="ui/UI_Sun.png" />
                <div> The Sun </div>
            </li>
            <hr />
            <li onClick={() => setFocus("hour")}>
                <img className="planet-icon" src="ui/UI_CaveTwin.png" />
                <div> Hourglass Twins </div>
            </li>
            <hr />

            <li onClick={() => setFocus("timber")}>
                <img className="planet-icon" src="ui/UI_TimberHearth.png" />
                <div> Timber Hearth </div>
            </li>
            <hr />

            <li onClick={() => setFocus("brittle")}>
                <img className="planet-icon" src="ui/UI_BrittleHollow.png" />
                <div> Brittle Hollow </div>
            </li>
            <hr />

            <li onClick={() => setFocus("deep")}>
                <img className="planet-icon" src="ui/UI_GiantsDeep.png" />
                <div> Giant's Deep </div>
            </li>
            <hr />

            <li onClick={() => setFocus("bramble")}>
                <img className="planet-icon" src="ui/UI_DarkBramble.png" />
                <div> Dark Bramble </div>
            </li>
        </ul>
    )
})
export default Navigation