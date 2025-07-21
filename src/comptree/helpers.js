export const getElementType = (node) => {
    if (node.type.startsWith('predef:')) {
        return "predefined";
    } else if (node.type.startsWith('userdef:')) {
        return "userDefined";
    } else {
        return "common";
    }
}

const higherOrderActionCreator = (action, setState, getState) => {
    if (action.actionParams?.length > 0) {
        const [actionType, ...actionParams] = action.actionParams
        if (actionType === "mutatestate") {
            return () => {
                if (actionParams[1] === "inc") {
                    setState(actionParams[0], getState(actionParams[0]) + 1)
                } else if (actionParams[1] === "dec") {
                    setState(actionParams[0], getState(actionParams[0]) - 1)
                }
            }
        }
    } else {
        return () => { }
    }
}

// todo: also account for the default values
export const resolveProps = (props, parentProps, getState) => {

    const res = {}

    for (let prop of props) {
        if (prop.value.startsWith('prop:')) {
            const propName = prop.value.split(':')[1];
            res[prop.name] = parentProps[propName];
        }
        // todo: get this right to support the global state
        else if (prop.value.startsWith('state:')) {
            const propName = prop.value.split(':')[1];
            res[prop.name] = getState(propName);
        }
        else {
            res[prop.name] = prop.value;
        }
    }

    return res;
}

export const getActionProps = (actions, setState, getState) => {
    const res = {}
    if (!actions) {
        return res;
    }
    for (let action of actions) {
        if (action.trigger === "onClick") {
            res["onClick"] = higherOrderActionCreator(action, setState, getState)
        }
    }
    return res;
} 