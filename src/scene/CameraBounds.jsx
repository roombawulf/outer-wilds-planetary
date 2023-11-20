import { useEffect } from "react"
import { Bounds, useBounds } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useSolarSystemStore } from "../States"

function ReBound({ children }){
    const { scene, size } = useThree()
    const api = useBounds() 
    const focus = useSolarSystemStore((state) => state.focus)

    useEffect(() => {
        console.log(api)
        const planet = scene.getObjectByName(focus)
        api.refresh(planet).fit()
    },[focus, size])

    return <>{children}</>
}

function CameraBounds({children}) {

    return (
        <Bounds fit clip observe margin={1.2}>
            <ReBound>
                {children}
            </ReBound>
        </Bounds>
    );
}

export default CameraBounds