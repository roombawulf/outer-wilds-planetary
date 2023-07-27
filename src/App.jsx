import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrthographicCamera, Environment, Loader } from '@react-three/drei'
import { useSpring, animated, config} from '@react-spring/three';
import * as THREE from 'three'

useGLTF.preload("/timberhearth-low.glb");


function Model(props) {
    const { nodes, materials } = useGLTF("/timberhearth-low.glb");

    const planet = useRef()
    const [isHover, setHover] = useState(false)

    useFrame((state, delta) => {
        planet.current.rotation.y += delta * 0.2
        planet.current.rotation.x += delta * 0.2

        planet.current.position.y = THREE.MathUtils.lerp( planet.current.position.y, 0, 0.02)
    })

    const { scale } = useSpring({
        scale: isHover ? 1.8 : 1.2,
        config: config.gentle
    });

    return (
      <animated.group {...props} dispose={null} scale={scale} ref={planet} position={[0, -1000, -1000]} onClick={() => setHover(!isHover)}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.BakedTerrain_TH_Proxy_Base001.geometry}
            material={materials.rock}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.BakedTerrain_TH_Proxy_Base001_1.geometry}
            material={materials.grass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.BakedTerrain_TH_Proxy_Base001_2.geometry}
            material={materials.ice}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.BakedTerrain_TH_Proxy_Base001_3.geometry}
            material={materials.dirt}
          />
        </group>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TH_Proxy_Structure001.geometry}
            material={materials["bramble-seed"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TH_Proxy_Structure001_1.geometry}
            material={materials["bramble-vine"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TH_Proxy_Structure001_2.geometry}
            material={materials.wood}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TH_Proxy_Structure001_3.geometry}
            material={materials["stone-white"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TH_Proxy_Structure001_4.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TH_Proxy_Structure001_5.geometry}
            material={materials.green}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TH_Proxy_Structure001_6.geometry}
            material={materials.blue}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TH_Proxy_Structure001_7.geometry}
            material={materials["dark-wood"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TH_Proxy_Structure001_8.geometry}
            material={materials.rock}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.trees001.geometry}
          material={materials.grass}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </animated.group>
    );
}

function Scene() {
    return(
        <>
            <Suspense fallback={null}>
                <Model />
            </Suspense>
            <Environment files="satara_night_1k.hdr" />
        </>
    )
}

function App() {
  return (
    <>
        <Canvas>
            <Scene />
            <OrthographicCamera makeDefault />
        </Canvas>
        <Loader />
    </>
  )
}

export default App
