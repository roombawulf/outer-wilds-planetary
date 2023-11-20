import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { CloudySurfaceMaterial } from "../../shaders/materials/cloudy-surface/CloudySurfaceMaterial";
import Label from "../../ui/label/Label";
import { useControls } from "leva";

extend({ CloudySurfaceMaterial })
function Surface(){
    const matRef = useRef(null)
    useFrame((state, delta) => {
        matRef.current.time = state.clock.elapsedTime
    })
    
    return (
        <cloudySurfaceMaterial 
            topColor={"#516231"}
            botColor={"#225200"}
            midColor1={"#315255"}
            midColor2={"#3b3900"}
            midColor3={"#579600"}
            intensity={0.08}
            key={CloudySurfaceMaterial.key} 
            ref={matRef} 
        />
    )
}


function GiantsDeep(props) {
    const planet = useRef(null)
    const { nodes, materials } = useGLTF(
        "planets/giants-deep/models/giants-deep.glb"
    );

    const opc = useTexture("planets/giants-deep/textures/opc.webp");
    opc.flipY = false;

    useFrame((state, delta) => planet.current.rotation.y = state.clock.elapsedTime * 0.1)

    return (
        <group {...props} dispose={null} ref={planet}>
            <Label position={[4.0,0.5,5.0]} fontSize={0.1}>
                Orbital Probe Cannon
            </Label>
            <mesh
                geometry={nodes["giants-deep"].geometry}
                material={nodes["giants-deep"].material}
                rotation={[Math.PI / 2, 0, 0]}
                scale={5}
            >
                <Surface />
            </mesh>
            <mesh
                geometry={nodes.OPC_Base_Proxy.geometry}
                position={[4.243, 0, 4.243]}
                rotation={[Math.PI / 2, 0, -Math.PI / 4]}
                scale={0.005}
            >
                <meshLambertMaterial map={opc} />
            </mesh>
            <mesh
                geometry={nodes.OPC_Cannon_Mid_Proxy.geometry}
                position={[3.055, 0.003, 5.154]}
                rotation={[Math.PI / 2, 0, -0.542]}
                scale={0.005}
            >
                <meshLambertMaterial map={opc} />
            </mesh>
            <mesh
                geometry={nodes.OPC_Cannon_Tip_Proxy.geometry}
                position={[2.086, 0.003, 5.623]}
                rotation={[Math.PI / 2, 0, -0.363]}
                scale={0.005}
            >
                <meshLambertMaterial map={opc} />
            </mesh>
        </group>
    );
}
export default GiantsDeep;
useGLTF.preload("planets/giants-deep/models/giants-deep.glb");
useTexture.preload("planets/giants-deep/textures/opc.webp");
