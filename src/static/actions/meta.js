// Action type definitions with their parameter schemas
export const ACTION_TYPES = {
    SCROLL_TO: {
        name: 'scroll-to',
        params: ['elementId'],
        description: 'Scroll to a specific element'
    },
    CHANGE_CLASS: {
        name: 'change-class',
        params: ['elementId', 'className', 'newValue'],
        description: 'Change a class property of an element'
    },
    CHANGE_STYLE: {
        name: 'change-style',
        params: ['elementId', 'styleProperty', 'newValue'],
        description: 'Change a CSS style property of an element'
    },
    TOGGLE_VISIBILITY: {
        name: 'toggle-visibility',
        params: ['elementId'],
        description: 'Toggle visibility of an element'
    },
    SET_PROP: {
        name: 'set-prop',
        params: ['elementId', 'propName', 'propValue'],
        description: 'Set a component prop'
    },
    FORM_SUBMISSION: {
        name: 'form-submission',
        params: ['formId', 'endpoint', 'method'],
        description: 'Submit form data to an endpoint'
    },
    NAVIGATE: {
        name: 'navigate',
        params: ['url', 'target'],
        description: 'Navigate to a URL'
    },
    TRIGGER_ANIMATION: {
        name: 'trigger-animation',
        params: ['elementId', 'animationType', 'duration', 'easing'],
        description: 'Trigger an animation on an element'
    },
    SHOW_MODAL: {
        name: 'show-modal',
        params: ['modalId', 'data'],
        description: 'Show a modal dialog'
    },
    HIDE_MODAL: {
        name: 'hide-modal',
        params: ['modalId'],
        description: 'Hide a modal dialog'
    }
}

//Also have a mapping showing which actions are available for each node type
export const ACTIONS_MAP = {
    "button": ["form-submission", "navigate", "trigger-animation"],
    "input": ["set-prop"],
    "form": ["form-submission"],
    "div": ["scroll-to", "toggle-visibility", "change-style", "change-class", "set-prop"],
}

// Event type definitions
export const EVENT_TYPES = {
    CLICK: 'onClick',
    HOVER: 'onHover',
    FOCUS: 'onFocus',
    BLUR: 'onBlur',
    CHANGE: 'onChange',
    SUBMIT: 'onSubmit',
    SCROLL: 'onScroll'
}