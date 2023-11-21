import { shaderMaterial } from "@react-three/drei";
import vertex from "./vertex.glsl"
import fragment from "./fragment.glsl"

export const SandColumnMaterial = shaderMaterial(
    { time: null },
    vertex,
    fragment
)