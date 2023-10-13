import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { Color } from "three";

function Label({ children, ...props }){

    const color = new Color()
    const [hover, setHover] = useState(false)
    const textRef = useRef(null)

    useEffect(() => {
        if (hover) document.body.style.cursor = 'pointer'
        return () => document.body.style.cursor = 'auto'
    }, [hover])

    useFrame((state, delta) => {
        // Make text face the camera
        // textRef.current.quaternion.copy(state.camera.quaternion)

        textRef.current.lookAt(state.camera.position)
        // Animate font color
        textRef.current.material.color.lerp(color.set(hover ? '#fa2720' : 'white'), 0.1)
    })


    return (
        <Text
        {...props}
        ref={textRef}
        onPointerOver={(e) => {
            e.stopPropagation()
            setHover(true)
        }}
        onPointerOut={()=>setHover(false)}
        >
            {children}
        </Text>
    )
}
export default Label