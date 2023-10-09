import { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { SandColumnMaterial } from "../shaders/materials/sand-column/SandColumnMaterial";
import { DoubleSide, BackSide } from "three";

extend({ SandColumnMaterial })

function AshTwin(props) {
    const { nodes, materials } = useGLTF(
        "planets/hourglass-twins/models/ash-twin.glb"
    );
    const terrain = useTexture(
        "planets/hourglass-twins/textures/ash-terrain.webp"
    );
    const structures = useTexture(
        "planets/hourglass-twins/textures/ash-structures.webp"
    );
    terrain.flipY = structures.flipY = false;

    const groupRef = useRef(null)
    const planetRef = useRef(null)
    const structureRef = useRef(null)
    const sandMat = useRef(null)

    useFrame((state, delta) => {
        sandMat.current.time = state.clock.elapsedTime
        structureRef.current.rotation.y = 0.2 * state.clock.elapsedTime
        planetRef.current.rotation.y = 0.2 * state.clock.elapsedTime
        groupRef.current.rotation.y = 0.1 * state.clock.elapsedTime
    })

    return (
        <group {...props} dispose={null} ref={groupRef}>
            <mesh
                geometry={nodes["sand-column"].geometry}
                position={[0.003, 0.001, -2.421]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.01}
            >
                <sandColumnMaterial
                transparent 
                key={SandColumnMaterial.key} 
                ref={sandMat} 
                />
            </mesh>
            <group>
                <mesh
                    geometry={nodes["ash-terrain"].geometry}
                    position={[-0.161, -0.002, -5.081]}
                    ref={planetRef}
                >
                    <meshLambertMaterial map={terrain} />
                </mesh>
                <mesh
                    geometry={nodes["ash-structures"].geometry}
                    position={[-0.161, -0.002, -5.081]}
                    ref={structureRef}
                >
                    <meshLambertMaterial map={structures} />
                </mesh>
            </group>
        </group>
    );
}
export default AshTwin;
useGLTF.preload("planets/hourglass-twins/models/ash-twin.glb");