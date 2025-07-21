import { useEffect } from "react"

export const TmpEffectWrapper = ({ children, depArray = [] }) => {

    useEffect(() => {
        console.log("tmp effect wrapper")
    }, [...depArray])

    return (
        <div>
            {children}
        </div>
    )
}