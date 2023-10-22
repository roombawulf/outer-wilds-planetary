import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Text, meshBounds } from "@react-three/drei";
import Label from "../ui/label/Label";


function TimberHearth(props) {
    const { nodes, materials } = useGLTF(
        "planets/timber-hearth/models/timber-hearth.glb"
    );
    const terrain = useTexture(
        "planets/timber-hearth/textures/timber-surfrace.webp"
    );
    const structures = useTexture(
        "planets/timber-hearth/textures/timber-structures.webp"
    );
    terrain.flipY = false;
    structures.flipY = false;

    const planet = useRef(null)

    // useFrame((state,delta) => planet.current.rotation.y = state.clock.elapsedTime * 0.1)

    return (

        <group ref={planet} {...props} dispose={null}>
            <Label position={[-2,4,0]} fontSize={0.15}>
                Youngbark Crater
            </Label>
            <Label position={[0.1,0.1,4.5]} fontSize={0.15}>
                The Village
            </Label>
            <Label position={[-5.0,0.0,0.0]} fontSize={0.15}>
                Geyser Mountains
            </Label>
            <Label position={[3.0,3.5,1.0]} fontSize={0.15}>
                Radio Tower
            </Label>
            <Label position={[0,-4.2,0]} fontSize={0.15}>
                Quantum Grove
            </Label>
            <Label position={[3.5,0,-4.0]} fontSize={0.15}>
                Nomai Mines
            </Label>
            <mesh scale={15} geometry={nodes["timber-surface"].geometry}>
                <meshLambertMaterial map={terrain} />
            </mesh>
            <mesh scale={15} geometry={nodes["timber-structures"].geometry}>
                <meshLambertMaterial map={structures} />
            </mesh>
        </group>
        
    )
}
export default TimberHearth;
useGLTF.preload("planets/timber-hearth/models/timber-hearth.glb");
useTexture.preload("planets/timber-hearth/textures/timber-surface.webp")
useTexture.preload("planets/timber-hearth/textures/timber-structures.webp")
