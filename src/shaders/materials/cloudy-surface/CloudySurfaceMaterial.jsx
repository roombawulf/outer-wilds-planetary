import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";
import vertex from "./vertex.glsl"
import fragment from "./fragment.glsl"

export const CloudySurfaceMaterial = shaderMaterial(
    { 
        time: 0.0,
        octaves: 4,
        intensity: 0.5,
        topColor: new Color(0, 0, 0.1),
        botColor: new Color(0, 0, 0.1),
        midColor1: new Color(0, 0, 0.2),
        modColor2: new Color(0.0, 0.2, 0.3),
        midColor3: new Color(0.0, 0.5, 0.0),
    },
    vertex,
    fragment
)