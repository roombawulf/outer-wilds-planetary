import { useState, useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import "./menu.scss"


export function MenuItem({children, ...props}){
    return(
        <li className="menu-item" {...props}>
            {children}
        </li>
    )
}

export function Menu({title, children, ...props}){

    const [open, setOpen] = useState(false)
    const menuList = useRef(null)

    useLayoutEffect(() => {
        gsap.to(menuList.current, {
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",

            duration: 0.2
        })
    }, [open])

    return(
        <nav className="menu" key={title}>
            <button className="menu-button" onClick={() => setOpen(!open)}>{title}</button>
            <ul className="menu-list" ref={menuList}>
                {children}
            </ul>
        </nav>
    )
}