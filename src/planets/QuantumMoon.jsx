import { useRef } from "react"
import { useNavigationStore } from "../States"
import { useState } from "react"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

function QuantumMoon(){

    const moon = useRef()
    const focus = useNavigationStore((state) => state.focus)
    const [observed, setObserved] = useState(false)
    const [currentLocation, setLocation] = useState("deep")
    const { scene } = useThree()
    const planets = ["timber", "brittle", "deep", "bramble"]

    useEffect(() => {
        moon.current.removeFromParent()
        scene.getObjectByName(currentLocation).add(moon.current)
    }, [])

    useEffect(() => {
        if (observed) {
            moon.current.removeFromParent()
            const possibleOrbits = planets.filter((planet) => (
                planet != currentLocation && planet != focus
            ))
            const newLocation = scene.getObjectByName(
                possibleOrbits[Math.floor(Math.random() * possibleOrbits.length)]
            )
            newLocation.add(moon.current)
            setLocation(newLocation.name)
            setObserved(false)
        }

        if ( moon.current.parent.name === focus ) {
            setObserved(true)
        }
    }, [focus])


    return(
        <mesh ref={moon}>
            <sphereGeometry />
            <meshBasicMaterial color={'pink'} />
        </mesh>
    )
}

export default QuantumMoon