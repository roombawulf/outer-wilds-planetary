import { useGLTF, useTexture } from "@react-three/drei";

function GiantsDeep(props) {
    const { nodes, materials } = useGLTF(
        "planets/giants-deep/models/giants-deep.glb"
    );

    const opc = useTexture("planets/giants-deep/textures/opc.webp");
    opc.flipY = false;

    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes["giants-deep"].geometry}
                material={nodes["giants-deep"].material}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <meshLambertMaterial color={'#294a3c'} />
            </mesh>
            <mesh
                geometry={nodes.OPC_Base_Proxy.geometry}
                position={[0.849, 0, 0.849]}
                rotation={[Math.PI / 2, 0, -Math.PI / 4]}
                scale={0.001}
            >
                <meshLambertMaterial map={opc} />
            </mesh>
            <mesh
                geometry={nodes.OPC_Cannon_Mid_Proxy.geometry}
                position={[0.611, 0.001, 1.031]}
                rotation={[Math.PI / 2, 0, -0.542]}
                scale={0.001}
            >
                <meshLambertMaterial map={opc} />
            </mesh>
            <mesh
                geometry={nodes.OPC_Cannon_Tip_Proxy.geometry}
                position={[0.417, 0.001, 1.125]}
                rotation={[Math.PI / 2, 0, -0.363]}
                scale={0.001}
            >
                <meshLambertMaterial map={opc} />
            </mesh>
        </group>
    );
}
export default GiantsDeep;
useGLTF.preload("planets/giants-deep/models/giants-deep.glb");
