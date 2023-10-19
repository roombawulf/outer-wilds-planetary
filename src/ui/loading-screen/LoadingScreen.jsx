import { useProgress } from "@react-three/drei";

export default function LoadingScreen(){
    const { progress } = useProgress()

    return (
        <div style={{ position: 'relative', color: 'aliceblue' }}>
            {progress}
        </div>
    )
}