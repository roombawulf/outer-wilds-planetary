import { useProgress } from "@react-three/drei";

function LoadingScreen(){
    const { progress } = useProgress()

    return <h1 style={{ position: 'relative', color: 'aliceblue' }}> {progress} </h1>
}
export default LoadingScreen