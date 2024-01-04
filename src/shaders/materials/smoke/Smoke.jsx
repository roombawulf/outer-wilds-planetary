import { useMemo, useRef } from "react";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";

const SmokeMaterial = shaderMaterial(
    {
        time: 0,
        map: null,
    },
    vertex,
    fragment
);
extend({ SmokeMaterial });

function Smoke({ ...props }) {
    const smoke = useTexture("smoke_column.png");
    smoke.wrapT = smoke.wrapS = THREE.RepeatWrapping;
    const matRef = useRef(null);
    const meshRef = useRef(null);
    useFrame((state, delta) => {
        matRef.current.time = state.clock.elapsedTime;
        meshRef.current.rotation.y = Math.atan2(
            state.camera.position.x - meshRef.current.position.x,
            state.camera.position.z - meshRef.current.position.z
        );
    });

    return (
        <mesh {...props} ref={meshRef}>
            <planeGeometry args={[1.5, 15, 50, 50]} />
            <smokeMaterial
                map={smoke}
                key={SmokeMaterial.key}
                transparent
                side={THREE.DoubleSide}
                depthWrite={false}
                ref={matRef}
            />
        </mesh>
    );
}
export default Smoke;
