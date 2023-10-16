import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { Color } from "three";

function Label({ children, ...props }){

    const textRef = useRef(null)

    useFrame((state, delta) => {
        textRef.current.lookAt(state.camera.position)
    })

    return (
        <Text
        {...props}
        font={'fonts/SpaceMono-Regular.ttf'}
        ref={textRef}
        >
            {children}
        </Text>
    )
}
export default Label