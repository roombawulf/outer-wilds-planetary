import { useState } from "react"
import "./toggle.scss"

function Toggle({children, handler}){
    const [toggle, setToggle] = useState(false)
    const onClick = () => {
        handler()
        setToggle(!toggle)
    }
    
    return (
        <button onClick={onClick} className="toggle-container">
            { toggle ? children[0] : children[1] }
        </button>
    )
}
export default Toggle