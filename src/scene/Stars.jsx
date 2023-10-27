import { useMemo, useEffect, useRef } from "react";
import { extend } from "@react-three/fiber";
import { StarsMaterial } from "../shaders/materials/stars/StarsMaterial";
import { MathUtils, Color } from "three";

extend({ StarsMaterial })

function Stars({ count }) {

    const matRef = useRef(null)
    const positions = useMemo(() => {

        const p = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const distance = Math.random() < 0.5 ? 75.0 : 60.0
            const theta = MathUtils.randFloatSpread(360);
            const phi = MathUtils.randFloatSpread(360);

            let x = distance * Math.sin(theta) * Math.cos(phi);
            let y = distance * Math.sin(theta) * Math.sin(phi);
            let z = distance * Math.cos(theta);

            p.set([x, y, z], i * 3);
        }

        return p

    }, [count]);

    const colors = useMemo(() => {
        const c = new Float32Array(count * 3)

        const cArray = [ new Color('red'), new Color('orange'), new Color('skyblue'), new Color('white') ]

        for(let i = 0; i < count; i++) {
            let idx = Math.round(Math.random() * 3.0) 
            c.set([cArray[idx].r, cArray[idx].g, cArray[idx].b], i * 3)
        }
        return c
    })

    return (
        <points>
            <bufferGeometry ref={matRef}>
                <bufferAttribute 
                attach="attributes-position" 
                count={count}
                array={positions}
                itemSize={3}
                />
                <bufferAttribute 
                attach="attributes-colors" 
                count={count}
                array={colors}
                itemSize={3}
                />
            </bufferGeometry>
            <starsMaterial key={StarsMaterial.key} transparent />
        </points>
    );
}

export default Stars