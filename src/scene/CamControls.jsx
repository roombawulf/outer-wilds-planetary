import { useRef, useEffect, useMemo } from "react";
import { useNavigationStore } from "../States";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function CamControls() {

    const { scene, camera, size } = useThree()
    const controlsRef = useRef(null);

    const bBox = useMemo(() => new THREE.Box3(), [])
    const bSize = useMemo(() => new THREE.Vector3(), [])
    const focus = useNavigationStore((state) => state.focus)


    // useEffect(() => {

    //     bBox.setFromObject(scene.getObjectByName(focus))
    //     bBox.getSize(bSize)

    //     const maxDim = Math.max(bSize.x, bSize.y, bSize.z)
    //     const fov = camera.fov * (Math.PI / 180)
    //     let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2))
    //     cameraZ *= size.width < 600 ? 8.0 : 10.0

    //     camera.position.z = cameraZ

    //     const minZ = bBox.min.z
    //     const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ
    //     camera.updateProjectionMatrix()

    //     controlsRef.current.maxDistance = cameraToFarEdge * 2

    // }, [focus])

    return <OrbitControls makeDefault ref={controlsRef} enablePan={false} />

}

export default CamControls