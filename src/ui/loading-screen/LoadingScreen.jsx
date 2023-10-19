import { useProgress } from "@react-three/drei";
import "./loadingscreen.scss"

export default function LoadingScreen(){
    const { active, progress, errors, item, loaded, total } = useProgress()

    return (

        <div className="loading-screen">
            <h1 className="loading-value"> progress: {progress} </h1>
            <h1 className="loading-value"> active: {active ? 'loading...' : 'loaded'} </h1>
            <h1 className="loading-value"> errors: {errors} </h1>
            <h1 className="loading-value"> item: {item} </h1>
            <h1 className="loading-value"> loaded: {loaded} </h1>
            <h1 className="loading-value"> total: {total} </h1>
        </div>
    )
}