import "./checkbox.scss"

function CheckBox({handler}) {
    return (
        <label className="check">
            <input type="checkbox" className="input" onChange={handler}/>
            <div className="box" />
        </label>
    )
}
export default CheckBox