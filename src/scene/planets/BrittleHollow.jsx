import { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Label from "../../ui/label/Label";
import BlackHole from "../../shaders/black-hole/BlackHole";

function BrittleHollow(props) {
    const planet = useRef(null);
    const { nodes, materials } = useGLTF(
        "planets/brittle-hollow/models/brittle-hollow.glb"
    );

    useFrame(
        (state, delta) =>
            (planet.current.rotation.y = state.clock.elapsedTime * 0.1)
    );

    const land1 = useTexture("planets/brittle-hollow/textures/land1.webp");
    const land2 = useTexture("planets/brittle-hollow/textures/land2.webp");
    const land3 = useTexture("planets/brittle-hollow/textures/land3.webp");
    const land4 = useTexture("planets/brittle-hollow/textures/land4.webp");
    const land5 = useTexture("planets/brittle-hollow/textures/land5.webp");
    const land6 = useTexture("planets/brittle-hollow/textures/land6.webp");
    const north = useTexture("planets/brittle-hollow/textures/north.webp");
    const south = useTexture("planets/brittle-hollow/textures/south.webp");
    const structures = useTexture(
        "planets/brittle-hollow/textures/structures.webp"
    );

    land1.flipY =
        land2.flipY =
        land3.flipY =
        land4.flipY =
        land5.flipY =
        land6.flipY =
        north.flipY =
        south.flipY =
        structures.flipY =
            false;

    return (
        <>
            <group {...props} dispose={null} ref={planet}>
                <Label position={[1.0, 1.5, 0]} fontSize={0.1}>
                    Hanging City
                </Label>
                <Label position={[0, -4.5, 0]} fontSize={0.1}>
                    Southern Observatory
                </Label>
                <Label position={[0, 4.2, 0]} fontSize={0.1}>
                    Northern Glacier
                </Label>
                <Label position={[4.2, 0, 0]} fontSize={0.1}>
                    Gravity Cannon
                </Label>
                <Label position={[0, 1.0, -4.5]} fontSize={0.1}>
                    Escape Pod 1
                </Label>
                <Label position={[-1.0, -1.0, 0]} fontSize={0.1} maxWidth={15}>
                    Tower of Quantum Knowledge
                </Label>

                <mesh
                    geometry={nodes["south-ice"].geometry}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.012}
                >
                    <meshLambertMaterial map={south} />
                </mesh>
                <mesh
                    geometry={nodes["north-ice"].geometry}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.012}
                >
                    <meshLambertMaterial map={north} />
                </mesh>
                <mesh
                    geometry={nodes.structures.geometry}
                    rotation={[1.911, -0.112, 1.66]}
                    scale={0.012}
                >
                    <meshLambertMaterial map={structures} />
                </mesh>
                <mesh
                    geometry={nodes["land-piece-1"].geometry}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.012}
                >
                    <meshLambertMaterial map={land1} />
                </mesh>
                <mesh
                    geometry={nodes["land-piece-2"].geometry}
                    rotation={[-2.324, 1.251, -0.977]}
                    scale={0.012}
                >
                    <meshLambertMaterial map={land2} />
                </mesh>
                <mesh
                    geometry={nodes["land-piece-3"].geometry}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.012}
                >
                    <meshLambertMaterial map={land3} />
                </mesh>
                <mesh
                    geometry={nodes["land-piece-5"].geometry}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.012}
                >
                    <meshLambertMaterial map={land5} />
                </mesh>
                <mesh
                    geometry={nodes["land-piece-4"].geometry}
                    rotation={[0.591, -0.038, -0.072]}
                    scale={0.012}
                >
                    <meshLambertMaterial map={land4} />
                </mesh>
                <mesh
                    geometry={nodes["land-piece-6"].geometry}
                    rotation={[-Math.PI, 0, -1.693]}
                    scale={0.012}
                >
                    <meshLambertMaterial map={land6} />
                </mesh>
                <BlackHole />
            </group>
        </>
    );
}
export default BrittleHollow;
useGLTF.preload("planets/brittle-hollow/models/brittle-hollow.glb");
useTexture.preload("planets/brittle-hollow/textures/land1.webp");
useTexture.preload("planets/brittle-hollow/textures/land2.webp");
useTexture.preload("planets/brittle-hollow/textures/land3.webp");
useTexture.preload("planets/brittle-hollow/textures/land4.webp");
useTexture.preload("planets/brittle-hollow/textures/land5.webp");
useTexture.preload("planets/brittle-hollow/textures/land6.webp");
useTexture.preload("planets/brittle-hollow/textures/north.webp");
useTexture.preload("planets/brittle-hollow/textures/south.webp");
useTexture.preload("planets/brittle-hollow/textures/structures.webp");
