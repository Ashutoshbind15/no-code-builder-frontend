import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Text } from '../customcomps/Text'
import { Card as UserCard } from '../customcomps/UserCard'
import { UserContainer } from '../customcomps/UserContainer'
import { UserText } from '../customcomps/UserText'

const globalStateDict = atom({})

// Global loading state atom for component store
export const componentStoreLoadingAtom = atom(true)

export const useStateStore = () => {
    const state = useAtomValue(globalStateDict)
    const setStateAtom = useSetAtom(globalStateDict)

    const getState = (stateKey) => {
        return state[stateKey]
    }

    const setState = (stateKey, stateValue) => {
        setStateAtom((prevState) => ({ ...prevState, [stateKey]: stateValue }))
    }

    const getStateDict = () => {
        return state
    }

    return {
        getState,
        setState,
        getStateDict
    }
}

const customComponentStateDict = atom({})

export const useCustomComponentStore = () => {

    const state = useAtomValue(customComponentStateDict)
    const setStateAtom = useSetAtom(customComponentStateDict)
    const [isLoading, setLoading] = useAtom(componentStoreLoadingAtom)

    // Simulate dynamic imports from a CDN - loading actual React components
    const dynamicComponentsImporter = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Return actual React components - this simulates CDN imports
                resolve({
                    UserCard: UserCard,
                    UserContainer: UserContainer,
                    UserText: UserText
                })
            }, 1000)
        })
    }

    useEffect(() => {
        dynamicComponentsImporter().then((res) => {
            setStateAtom((prevState) => ({ ...prevState, ...res }))
            setLoading(false)
        })
    }, [])

    return {
        customComponents: state,
        isLoading
    }
}