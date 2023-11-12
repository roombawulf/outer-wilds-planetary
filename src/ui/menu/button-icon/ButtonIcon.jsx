import { useEffect } from "react"
import "./buttonIcon.scss"

function ButtonIcon({icon, className, children, ...props}){

    const classes = className ? className : ""
    return (
        <button className={`button ${classes}`.trim()} {...props}>
            {icon && <img src={icon} />}
            <span>{children}</span>
        </button>
    )
}
export default ButtonIcon