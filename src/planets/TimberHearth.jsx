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

    useFrame((state,delta) => planet.current.rotation.y = state.clock.elapsedTime * 0.1)

    return (

        <group ref={planet} {...props} dispose={null}>
            <Label position={[-2,4,0]} scale={0.2}>
                Youngbark Crater
            </Label>
            <Label position={[0.1,0.1,4.5]} scale={0.2}>
                The Village
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
