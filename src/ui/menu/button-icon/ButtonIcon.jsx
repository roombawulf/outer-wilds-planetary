import "./buttonIcon.scss"

function ButtonIcon({icon, children, ...props}){
    return (
        <button className="button" {...props}>
            {icon && <img src={icon} />}
            {children}
        </button>
    )
}
export default ButtonIcon