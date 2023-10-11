import { extend, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { GiantsDeepSurfaceMaterial } from "../shaders/materials/giants-deep-surface/GiantsDeepSurfaceMaterial";
import { useRef } from "react";

extend({ GiantsDeepSurfaceMaterial })
function Surface(){
    const matRef = useRef(null)
    useFrame((state, delta) => {
        matRef.current.time = state.clock.elapsedTime
    })

    return (
        <giantsDeepSurfaceMaterial key={GiantsDeepSurfaceMaterial.key} ref={matRef} />
    )
}


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
                <Surface />
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
