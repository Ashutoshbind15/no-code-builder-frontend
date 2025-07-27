import { customComponentsMetadata } from "./customstate"
import { getActionProps, getElementType } from "./helpers"
import { useCustomComponentStore, usePropMappingStore, useStateStore } from "./statestore"

const getPropValue = (nodeid, propName) => {
    const { getPropMapping } = usePropMappingStore()
    return getPropMapping(nodeid, propName)
}

const propResolver = (props, getState) => {
    const resolvedProps = {}
    for (const prop of props) {
        const { name, value } = prop

        const isDependentOnParent = value.startsWith("prop:")
        if (isDependentOnParent) {
            const propValue = getPropValue(nodeid, name)
            resolvedProps[name] = propValue
        } else if (value.startsWith("state:")) {
            const propValue = getState(value.split(":")[1])
            resolvedProps[name] = propValue
        } else {
            resolvedProps[name] = value
        }
    }
    return resolvedProps
}

const stateInitter = (nodeState, setState, getState) => {
    for (const state of nodeState) {
        const { name, type, initValue } = state
        const doesExist = getState(name)
        if (!doesExist) {
            setState(name, initValue)
        }
    }
}

//todo: add effects

export const CustomRendererNew = ({ node }) => {
    const { getState, setState } = useStateStore()
    const { customComponents } = useCustomComponentStore()
    console.log("nodeid", node.id)

    const nodeState = node.state
    stateInitter(nodeState, setState, getState)

    const nodeProps = node.props
    const resolvedProps = propResolver(nodeProps, getState)
    const extraProps = getActionProps(node.actions, setState, getState)

    const elementType = getElementType(node)

    if (elementType === "common") {
        return <node.type {...resolvedProps} {...extraProps}>
            {node.children && node.children.map((child) => (
                <CustomRendererNew key={child.id} node={child} />
            ))}
        </node.type>
    } else if (elementType === "predefined") {
        const customNodeType = node.type.split(':')[1]
        const CustomComponent = customComponents[customNodeType]
        const customNodeMetadata = customComponentsMetadata[customNodeType]

        if (!customNodeMetadata.takesChildren) {
            return <CustomComponent {...resolvedProps} {...extraProps} />
        } else {
            return <CustomComponent {...resolvedProps} {...extraProps}>
                {node.children && node.children.map((child) => (
                    <CustomRendererNew key={child.id} node={child} />
                ))}
            </CustomComponent>
        }
    }

    // for the userdef comps, when they're added to the tree, we traverse, populate the dependencies, ids and add them to the body state
    // according to the structure, like a composition of common and predefined comps
    return <></>
}