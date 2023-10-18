import { useGLTF, useTexture } from "@react-three/drei";
import Label from "../ui/label/Label";

function EmberTwin(props) {
    const { nodes, materials } = useGLTF(
        "planets/hourglass-twins/models/ember-twin.glb"
    );

    const terrainTop = useTexture(
        "planets/hourglass-twins/textures/ember-terrain-top.webp"
    );
    const terrainBottom = useTexture(
        "planets/hourglass-twins/textures/ember-terrain-bottom.webp"
    );
    const structures = useTexture(
        "planets/hourglass-twins/textures/ember-structures.webp"
    );
    terrainTop.flipY = terrainBottom.flipY = structures.flipY = false;

    return (
        <group {...props} dispose={null}>
            <Label position={[2.75, -2.0, 2.0]} scale={0.1}>
                Escape Pod 2
            </Label>
            <Label position={[0, -1.0, -4.0]} scale={0.1}>
                Gravity Cannon
            </Label>
            <Label position={[-3.5, 1.0, 3.0]} scale={0.1}>
                High Energy Lab
            </Label>
            <Label position={[0, -4.0, 0]} scale={0.1}>
                Quantum Moon Locator
            </Label>
            <Label position={[0, 3.5, 0]} scale={0.1}>
                Chert's Camp
            </Label>


            <mesh
                geometry={nodes["terrain-bottom"].geometry}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.02}
            >
                <meshLambertMaterial map={terrainBottom} />
            </mesh>
            <mesh
                geometry={nodes["terrain-top"].geometry}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.02}
            >
                <meshLambertMaterial map={terrainTop} />
            </mesh>
            <mesh
                geometry={nodes["ember-structures"].geometry}
                position={[0, 0.005, 0.001]}
                scale={2}
            >
                <meshLambertMaterial map={structures} />
            </mesh>
        </group>
    );
}
export default EmberTwin;
useGLTF.preload("planets/hourglass-twins/models/ember-twin.glb");
