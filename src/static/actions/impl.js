// Action implementation functions
import { getCategorizedProps } from '../../predefcomps/metadata'
import { nodeAtomFamily } from '../atoms'

// Helper function to determine the correct category for a prop based on component metadata
const getCategoryForProp = (nodeId, propName, get) => {
    try {
        // Get the node to find its component type
        const node = get(nodeAtomFamily(nodeId))
        const componentType = node.componentType

        // Get the categorized props metadata for this component
        const categorizedProps = getCategorizedProps(componentType)

        if (!categorizedProps || !Array.isArray(categorizedProps)) {
            console.warn(`No metadata found for component type: ${componentType}`)
            return 'styling' // fallback
        }

        // Search through all categories to find which one contains this prop
        for (const category of categorizedProps) {
            if (category.props && Array.isArray(category.props)) {
                const propExists = category.props.some(prop => prop.name === propName)
                if (propExists) {
                    return category.category
                }
            }
        }

        console.warn(`Prop "${propName}" not found in metadata for component "${componentType}"`)
        return 'styling' // fallback to styling if prop not found
    } catch (error) {
        console.error('Error determining category for prop:', error)
        return 'styling' // fallback
    }
}

export const scrollToElement = (elementId) => {
    const element = document.querySelector(`[data-node-id="${elementId}"]`)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

export const changeElementClass = (elementId, className, newValue, get, set, updateNodePropsAtom) => {
    set(updateNodePropsAtom, {
        nodeId: elementId,
        propKey: className,
        propValue: newValue,
        category: 'styling'
    })
}

export const changeElementStyle = (elementId, styleProperty, newValue, get, set, updateNodePropsAtom) => {
    set(updateNodePropsAtom, {
        nodeId: elementId,
        propKey: styleProperty,
        propValue: newValue,
        category: 'styling'
    })
}

export const toggleElementVisibility = (elementId, get, set, nodePropsAtomFamily, updateNodePropsAtom) => {
    const currentProps = get(nodePropsAtomFamily(elementId))
    const currentVisibility = currentProps.containerStyles?.visible ?? true

    set(updateNodePropsAtom, {
        nodeId: elementId,
        propKey: 'visible',
        propValue: !currentVisibility,
        category: 'containerStyles'
    })
}

export const setElementProp = (elementId, propName, propValue, get, set, updateNodePropsAtom) => {
    // Use the metadata-based category lookup
    const category = getCategoryForProp(elementId, propName, get)

    console.log('setElementProp', elementId, propName, propValue, category)

    set(updateNodePropsAtom, {
        nodeId: elementId,
        propKey: propName,
        propValue: propValue,
        category: category
    })
}

export const submitForm = async (formId, endpoint, method, get, nodePropsAtomFamily) => {
    // Get form data from global state
    const formData = get(nodePropsAtomFamily(formId))

    try {
        const response = await fetch(endpoint, {
            method: method || 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        console.log('Form submitted successfully:', result)
    } catch (error) {
        console.error('Form submission failed:', error)
    }
}

export const navigateToUrl = (url, target = '_self') => {
    if (target === '_blank') {
        window.open(url, '_blank')
    } else {
        window.location.href = url
    }
}
