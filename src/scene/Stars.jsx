import { useMemo } from "react";
import { extend } from "@react-three/fiber";
import { StarsMaterial } from "../shaders/materials/stars/StarsMaterial";
import { MathUtils } from "three";
extend({ StarsMaterial })

function Stars({ count }) {
    const positions = useMemo(() => {

        const p = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const distance = Math.sqrt(Math.random()) * 100.0;
            const theta = MathUtils.randFloatSpread(360);
            const phi = MathUtils.randFloatSpread(360);

            let x = distance * Math.sin(theta) * Math.cos(phi);
            let y = distance * Math.sin(theta) * Math.sin(phi);
            let z = distance * Math.cos(theta);

            p.set([x, y, z], i * 3);
        }

        return p

    }, [count]);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute 
                attach="attributes-position" 
                count={count}
                array={positions}
                itemSize={3}
                />
            </bufferGeometry>
            <starsMaterial />
        </points>
    );
}

export default Stars