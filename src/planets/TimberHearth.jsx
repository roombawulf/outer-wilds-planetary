import { useGLTF, useTexture } from "@react-three/drei";

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
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes["timber-surface"].geometry}>
                <meshLambertMaterial map={terrain} />
            </mesh>
            <mesh geometry={nodes["timber-structures"].geometry}>
                <meshLambertMaterial map={structures} />
            </mesh>
        </group>
    );
}
export default TimberHearth;
useGLTF.preload("planets/timber-hearth/models/timber-hearth.glb");
