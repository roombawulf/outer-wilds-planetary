import { useState, useEffect, useRef, forwardRef } from "react"
import { useSolarSystemStore } from "../../States"
import { useFrame, useThree } from "@react-three/fiber"
import { CloudySurfaceMaterial } from "../../shaders/materials/cloudy-surface/CloudySurfaceMaterial";
import Label from "../../ui/label/Label";

function SurfaceMaterial(){
    const matRef = useRef(null)
    useFrame((state, delta) => {
        matRef.current.time = state.clock.elapsedTime
    })

    return (
        <cloudySurfaceMaterial
            topColor={"#868686"} 
            botColor={"#868686"} 
            midColor1={"#525669"} 
            midColor2={"#525669"} 
            midColor3={"#525669"} 
            octaves={2}
            intensity={0.35}
            key={CloudySurfaceMaterial.key} 
            ref={matRef} 
        />
    )
}

const QuantumMoon = forwardRef(function QuantumMoon(props, ref){

    const focus = useSolarSystemStore((state) => state.focus)
    const quantumObserved = useSolarSystemStore((state) => state.quantumObserved)
    const setQuantumObserved = useSolarSystemStore((state) => state.setQuantumObserved)
    const [currentLocation, setLocation] = useState("deep")
    const planets = ["hour", "timber", "brittle", "deep", "bramble"]
    const { scene } = useThree()

    useFrame((state, delta) => {
        ref.current.position.x = 10.0 * Math.sin(state.clock.elapsedTime * 0.1)
        ref.current.position.z = 10.0 * Math.cos(state.clock.elapsedTime * 0.1)
    })

    useEffect(() => {
        ref.current.removeFromParent()
        scene.getObjectByName(currentLocation).add(ref.current)
    }, [])

    useEffect(() => {
        if (quantumObserved) {
            ref.current.removeFromParent()
            const possibleOrbits = planets.filter((planet) => (
                planet != currentLocation && planet != focus
            ))
            const newLocation = scene.getObjectByName(
                possibleOrbits[Math.floor(Math.random() * possibleOrbits.length)]
            )
            newLocation.add(ref.current)
            setLocation(newLocation.name)
            setQuantumObserved(false)
        }

        if ( ref.current.parent.name === focus ) {
            setQuantumObserved(true)
        }
    }, [focus])


    return(
        <group ref={ref} name="quantum" position={[-4,0,0]}>
            <Label position={[0,1.2,0]} fontSize={0.1}>
                Quantum Moon
            </Label>
            <mesh scale={0.6}>
                <sphereGeometry />
                <SurfaceMaterial />
            </mesh>
        </group>
    )
})

export default QuantumMoon