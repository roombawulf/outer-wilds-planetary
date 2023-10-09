import { useNavigationStore } from "../../States"
import "./navigation.scss"

function Navigation() {

    const setFocus = useNavigationStore( (state) => state.setFocus )
    const setFocusAndActive = (focus) => { setFocus(focus) }
    
    return(
        <div id="solar-navigation">
            <label tooltip-content="Solar System" onClick={() => setFocusAndActive('sun')}>
                <input type="radio" name="navigation" id="sun"/>
                <img className="planet-icon" src="../ui/UI_Sun.png" alt="Solar icon"/>
            </label>
    
            <label tooltip-content="Hourglass Twins" onClick={() => setFocusAndActive('hour')}>
                <input type="radio" name="navigation" id="hour" />
                <img className="planet-icon" src="../ui/UI_CaveTwin.png" alt="Hourglass Twins icon"/>
            </label>

            <label tooltip-content="Timber Hearth" onClick={() => setFocusAndActive('timber')}>
                <input type="radio" name="navigation" id="timber" />
                <img className="planet-icon" src="../ui/UI_TimberHearth.png" alt="Timber Hearth icon"/>
            </label>

            <label tooltip-content="Brittle Hollow" onClick={() => setFocusAndActive('brittle')}>
                <input type="radio" name="navigation" id="brittle" />
                <img className="planet-icon" src="../ui/UI_BrittleHollow.png" alt="Brittle Hollow icon"/>
            </label>

            <label tooltip-content="Giants Deep" onClick={() => setFocusAndActive('deep')}>
                <input type="radio" name="navigation" id="deep" />
                <img className="planet-icon" src="../ui/UI_GiantsDeep.png" alt="Giants Deep icon"/>
            </label>

            <label tooltip-content="Dark Bramble" onClick={() => setFocusAndActive('bramble')}>
                <input type="radio" name="navigation" id="bramble" />
                <img className="planet-icon" src="../ui/UI_DarkBramble.png" alt="Dark Bramble icon"/>
            </label>
        </div>
    )
}
export default Navigation