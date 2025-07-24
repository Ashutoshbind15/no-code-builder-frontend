import React from "react";
import { customComponentsMetadata, userDefComps } from "./customstate";
import { useStateStore, useCustomComponentStore } from "./statestore";
import { TmpEffectWrapper } from "./TmpEffectWrapper";
import { getElementType, resolveProps, getActionProps } from "./helpers";

// todo: track ids
export const CustomRenderer = ({ node, props }) => {
    const { getState, setState } = useStateStore()
    const { customComponents } = useCustomComponentStore()

    console.log("nodeid", node.id)

    if (node.type === "stringLiteral") {
        return <>
            {props.text}
        </>;
    }

    let jsx = null;
    const extraProps = getActionProps(node.actions, setState, getState)

    if (getElementType(node) === "common") {
        jsx = (
            <node.type {...props} {...extraProps}>
                {node.children && node.children.map((child) => (
                    <CustomRenderer key={child.id} node={child} props={resolveProps(child.props, props, getState)} />
                ))}
            </node.type>
        )
    } else if (node.type === "children") {
        jsx = <>children</>
    } else if (getElementType(node) === "predefined") {
        const customNodeType = node.type.split(':')[1]
        const CustomComponent = customComponents[customNodeType]
        const customNodeMetadata = customComponentsMetadata[customNodeType]

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

        const userDefNodeType = node.type.split(':')[1]
        const userDefNodeMetadata = userDefComps[userDefNodeType]
        const componentBody = userDefNodeMetadata.body

        // unfold the comp body into jsx first, then for the children type node, render the children
        if (userDefNodeMetadata.takesChildren) {
            jsx = componentBody.map((bodyNode) => {
                return <CustomRenderer key={bodyNode.id} node={bodyNode} props={resolveProps(bodyNode.props, props, getState)} />
            })

            // find the children node placeholder from the jsx, then render the children instead of it
            console.log("jsx", jsx)

        } else {
            jsx = componentBody.map((bodyNode) => {
                return <CustomRenderer key={bodyNode.id} node={bodyNode} props={resolveProps(bodyNode.props, props, getState)} />
            })
        }

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