import { atom, useAtomValue, useSetAtom } from 'jotai'

const globalStateDict = atom({})

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