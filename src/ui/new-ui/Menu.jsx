import { useState, useRef, useEffect, useLayoutEffect } from "react"
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
    const menuButton = useRef(null)

    const handleButtonClick = (e) => {
        setOpen(!open)
    }
    const handleOutsideClick = (e) => {
        if (
            menuList.current 
            && open 
            && !menuList.current.contains(e.target)
            && !menuButton.current.contains(e.target)
        ) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    },[handleOutsideClick])

    useLayoutEffect(() => {
        gsap.to(menuList.current, {
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",

            duration: 0.2
        })
    }, [open])

    return(
        <menu className="menu" key={title}>
            <button className="menu-button" onClick={handleButtonClick} ref={menuButton}>
                {title}
            </button>
            <ul className="menu-list" ref={menuList}>
                {children}
            </ul>
        </menu>
    )
}