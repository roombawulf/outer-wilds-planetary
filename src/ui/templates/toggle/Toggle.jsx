import "./toggle.scss"

function Toggle({handler}) {
    return (
        <label className="toggle">
            <input type="checkbox" className="toggle-input" onChange={handler}/>
            <div className="toggle-box" />
        </label>
    )
}
export default Toggle