import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrthographicCamera, Environment, Loader } from '@react-three/drei'
import * as THREE from 'three'

function Model(props) {
    const { nodes, materials } = useGLTF("/timberhearth-low.glb");

    const planet = useRef()

    useFrame((state, delta) => {
        planet.current.rotation.y += delta * 0.2
        planet.current.rotation.x += delta * 0.2
    })

    return (
      <group {...props} dispose={null} scale={1.2} ref={planet} position={[0, 0, -1000]}>
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
      </group>
    );
}
useGLTF.preload("/timberhearth-low.glb");

function Scene() {
    return(
        <>
            <Model />
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
