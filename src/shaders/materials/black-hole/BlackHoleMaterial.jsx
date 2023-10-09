import { shaderMaterial } from "@react-three/drei";
import * as THREE from 'three';

export const BlackHoleMaterial = shaderMaterial(
    { resolution: new THREE.Vector2(), diffuseTexture: null },

    `
        varying vec2 v_uv;

        varying vec3 v_normal;
        varying vec3 v_world_normal;
        varying vec3 v_world_position;

        void main(){

            v_uv = uv;
            v_normal = normalMatrix * normal;
            v_world_normal = (modelMatrix * vec4(normal, 1.0)).xyz;
            
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            v_world_position = worldPos.xyz;

            vec4 viewPos = viewMatrix * worldPos;
            vec4 projectedPos = projectionMatrix * viewPos;

            gl_Position = projectedPos;
        }
    `,

    `   
        #define PI 3.14159265359

        varying vec2 v_uv;
        varying vec3 v_normal;
        varying vec3 v_world_normal;
        varying vec3 v_world_position;

        uniform sampler2D diffuseTexture;
        uniform vec2 resolution;

        void main(){

            vec2 screenUV = (gl_FragCoord.xy) / resolution.xy;

            // fresnel
            vec3 eyeVec = normalize(v_world_position.xyz - cameraPosition);
            float invFresnel = abs( dot(eyeVec, v_world_normal) );
            float fresnel = 1.0 - invFresnel;

            // displacement distortion uv
            invFresnel = pow(invFresnel, 6.0);
            vec3 negateNormal =  -v_normal;
            vec2 displacement = negateNormal.xy * invFresnel;

            // black hole mask
            float blackHoleMask = pow(fresnel, 0.45);
            blackHoleMask = round(blackHoleMask);
            
            // sample diffuse with distorted uvs
            vec4 diffuse = texture2D( diffuseTexture, screenUV + displacement );

            gl_FragColor = diffuse * blackHoleMask;

            #include <colorspace_fragment>
        }
    `
)