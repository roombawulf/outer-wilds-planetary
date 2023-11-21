import { shaderMaterial } from "@react-three/drei";
import vertex from "./vertex.glsl"
import fragment from "./fragment.glsl"

export const StarsMaterial = shaderMaterial(
    { time: 0.0 },
    vertex,
    fragment
)