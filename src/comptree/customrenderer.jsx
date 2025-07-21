import React from "react";
import { customComponentsMetadata } from "./customstate";
import { useStateStore, useCustomComponentStore } from "./statestore";
import { TmpEffectWrapper } from "./TmpEffectWrapper";
import { getElementType, resolveProps, getActionProps } from "./helpers";

// todo: track ids
export const CustomRenderer = ({ node, props }) => {
    const { getState, setState } = useStateStore()
    const { customComponents } = useCustomComponentStore()

    if (node.type === "stringLiteral") {
        return <>
            {props.text}
        </>;
    }

    let jsx = null;

    if (getElementType(node) === "common") {
        const extraProps = getActionProps(node.actions, setState, getState)

        jsx = (
            <node.type {...props} {...extraProps}>
                {node.children && node.children.map((child) => (
                    <CustomRenderer key={child.id} node={child} props={resolveProps(child.props, props, getState)} />
                ))}
            </node.type>
        )
    } else if (getElementType(node) === "predefined") {
        const customNodeType = node.type.split(':')[1]
        const CustomComponent = customComponents[customNodeType]
        const customNodeMetadata = customComponentsMetadata[customNodeType]
        const extraProps = getActionProps(node.actions, setState, getState)

        if (!customNodeMetadata.takesChildren) {
            jsx = <CustomComponent {...props} {...extraProps} />
        } else {
            jsx = (
                <CustomComponent {...props} {...extraProps}>
                    {node.children && node.children.map((child) => (
                        <CustomRenderer key={child.id} node={child} props={resolveProps(child.props, props, getState)} />
                    ))}
                </CustomComponent>
            )
        }
    } else if (getElementType(node) === "userDefined") {
        jsx = <></>
    } else {
        jsx = <></>
    }

    if (node.id === "main-content-container") {
        return (
            <TmpEffectWrapper depArray={[props.className]}>
                {jsx}
            </TmpEffectWrapper>
        )
    }

    return jsx;
}