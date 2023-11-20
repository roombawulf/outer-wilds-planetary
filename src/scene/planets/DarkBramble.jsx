import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";

function DarkBramble(props) {
    const planet = useRef(null)
    const { nodes, materials } = useGLTF("planets/dark-bramble/models/dark-bramble.glb");
    const seed = useTexture("planets/dark-bramble/textures/seed.webp")
    const ice = useTexture("planets/dark-bramble/textures/ice.webp")
    const vines = useTexture("planets/dark-bramble/textures/vines.webp")
    const vines2 = useTexture("planets/dark-bramble/textures/vines2.webp")

    seed.flipY = ice.flipY = vines.flipY = vines2.flipY = false

    useFrame((state, delta) => planet.current.rotation.y = state.clock.elapsedTime * 0.1)

    return (
        <group {...props} dispose={null} ref={planet}>
            <mesh
                geometry={nodes["bramble-seed"].geometry}
                position={[0, 0, 0]}
                scale={0.005}
            >
                <meshLambertMaterial map={seed} />
            </mesh>
            <mesh
                geometry={nodes["bramble-ice"].geometry}
                position={[0, 0, 0]}
                scale={0.005}
            >
                <meshLambertMaterial map={ice} />
            </mesh>
            <mesh
                geometry={nodes["bramble-vine"].geometry}
                position={[0, 0, 0]}
                scale={0.005}
            >
                <meshLambertMaterial map={vines} />
            </mesh>
            <mesh
                geometry={nodes["bramble-vine001"].geometry}
                position={[0, 0, 0]}
                scale={0.005}
            >
                <meshLambertMaterial map={vines2} />
            </mesh>
        </group>
    );
}
export default DarkBramble
useGLTF.preload("planets/dark-bramble/models/dark-bramble.glb");
useTexture.preload("planets/dark-bramble/textures/seed.webp")
useTexture.preload("planets/dark-bramble/textures/ice.webp")
useTexture.preload("planets/dark-bramble/textures/vines.webp")
useTexture.preload("planets/dark-bramble/textures/vines2.webp")
