import { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { SandColumnMaterial } from "../../shaders/materials/sand-column/SandColumnMaterial";

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
        structureRef.current.rotation.y = 0.1 * state.clock.elapsedTime
        planetRef.current.rotation.y = 0.1 * state.clock.elapsedTime
        groupRef.current.rotation.y = 0.05 * state.clock.elapsedTime
    })

    return (
        <group {...props} dispose={null} ref={groupRef}>
            <mesh
                geometry={nodes["sand-column"].geometry}
                position={[0.006, 0.001, -4.842]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.02}
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
                    position={[-0.323, -0.003, -10.161]}
                    scale={2}
                    ref={planetRef}
                >
                    <meshLambertMaterial map={terrain} />
                </mesh>
                <mesh
                    geometry={nodes["ash-structures"].geometry}
                    position={[-0.323, -0.003, -10.161]}
                    scale={2}
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
useTexture.preload("planets/hourglass-twins/textures/ash-terrain.webp")
useTexture.preload("planets/hourglass-twins/textures/ash-structures.webp")
