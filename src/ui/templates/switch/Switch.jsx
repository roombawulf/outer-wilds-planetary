import "./switch.scss"

function Switch({handler, svgLeft, svgRight}) {
    return (
        <label className="switch">
            <input type="checkbox" className="switch-toggle" onChange={handler} />
            <div className="switch-left">
                <img className="switch-icon" src={svgLeft} />
            </div>
            <div className="switch-right">
                <img className="switch-icon" src={svgRight} />
            </div>
        </label>
    );
}
export default Switch
