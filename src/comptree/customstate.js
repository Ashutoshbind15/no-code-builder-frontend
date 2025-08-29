export const customStarterState = {
    root: {
        id: "root",
        type: "div",
        // keeping the effects and state on the top level while rendering, while building, push it down the tree and optimize
        effects: [],
        actions: [],
        state: [],
        props: [],
        children: [
            {
                id: "sidebar",
                type: "div",
                props: [{
                    name: "className",
                    value: "w-1/4 bg-red-500"
                }],
                effects: [],
                actions: [],
                state: [{
                    name: "ctrval",
                    type: "number",
                    initValue: 0
                }],
                children: [
                    {
                        id: "sidebar-button",
                        type: "button",
                        props: [{
                            name: "className",
                            value: "bg-blue-500"
                        }],
                        // todo: update the hof in acc to the new param
                        actions: [{
                            trigger: "onClick",
                            actionParams: ["mutatestate", "sidebar", "ctrval", "inc"]
                        }],
                        children: [{
                            id: "sidebar-button-text",
                            type: "predef:Text",
                            props: [{
                                name: "text",
                                value: "Click me"
                            }]
                        }],
                        effects: [],
                        state: []
                    }
                ]
            },
            {
                id: "main",
                type: "main",
                props: [{
                    name: "className",
                    value: "w-3/4 bg-green-500"
                }],
                effects: [],
                actions: [],
                state: [],
                children: [
                    {
                        id: "main-content-card",
                        type: "predef:Card",
                        // we dont add state and effects here cause they are userdef comps, but editing state and effects per comp is available
                        props: [{
                            name: "title",
                            value: "Hello"
                        }, {
                            name: "description",
                            value: "This is a description"
                        }, {
                            name: "image1",
                            value: "https://example.com/images/150"
                        }]
                    }, {
                        id: "main-content-container",
                        type: "predef:Container",
                        props: [{
                            name: "className",
                            value: "bg-blue-500"
                        }],
                        children: [
                            {
                                id: "main-content-container-child-div",
                                type: "div",
                                props: [{
                                    name: "className",
                                    value: "bg-green-500"
                                }],
                                children: [
                                    {
                                        id: "main-content-container-child-div-child-p",
                                        type: "predef:Text",
                                        props: [{
                                            name: "className",
                                            value: "text-sm text-gray-500"
                                        }, {
                                            name: "text",
                                            value: "state:sidebar:ctrval"
                                        }]
                                    }
                                ],
                                effects: [],
                                actions: [],
                                state: []
                            }
                        ]
                    }
                ]
            }, {
                id: "section-aside",
                type: "userdef:Section",
                props: [{
                    name: "title",
                    value: "section title"
                }, {
                    name: "className",
                    value: "bg-blue-500"
                }],
                children: [

                    {
                        type: "predef:Card",
                        props: [{
                            name: "title",
                            value: "prop:section-aside:title"
                        }, {
                            name: "description",
                            value: "section description"
                        }, {
                            name: "image1",
                            value: "https://example.com/images/150"
                        }],
                    },
                    {
                        id: "section-aside-blankspace",
                        type: "div",
                        props: [],
                        children: [
                            {
                                id: "section-aside-blankspace-text",
                                type: "predef:Text",
                                props: [{
                                    name: "text",
                                    value: "prop:section-aside:title"
                                }]
                            }
                        ]
                    },
                ],
                state: [],
                actions: [],
                effects: []
            }
        ]

    }
}

export const customComponentsMetadata = {
    "Card": {
        takesChildren: false,
        defaultProps: [{
            name: "title",
            type: "string",
            value: "Hello there",
        }, {
            name: "description",
            type: "string",
            value: "this is a description"
        }, {
            name: "image1",
            type: "string",
            value: "https://images.example.com/150"
        }]
    },
    "Container": {
        takesChildren: true,
        defaultProps: [{
            name: "className",
            type: "string",
            value: "bg-red-500"
        }]
    },
    "Text": {
        takesChildren: false,
        defaultProps: [{
            name: "text",
            type: "string",
            value: "Enter here"
        }, {
            name: "className",
            type: "string",
            value: "text-sm text-gray-500"
        }]
    },
}

// the user comps that take children help them build layouts
export const userDefComps = {
    "Section": {

        type: "div",

        // for now, we'll not allow children for all userdef comps
        // takesChildren: true,
        // means we can add elements to the body array
        props: [{
            name: "className",
            defaultValue: "bg-blue-500"
        }, {
            name: "title",
            defaultValue: "Hello"
        }],
        state: [],
        effects: [],
        actions: [],
        children: [
            {
                // ids inside of body dont make sense, as body is just for the sake of structure, 
                // ids should be declared at runtime, when the custom/usercomp is used inside of the 
                // dnd editor
                // id: "userseccard",
                type: "predef:Card",
                props: [{
                    name: "title",
                    value: "prop:{Section}:title"
                }, {
                    name: "description",
                    value: "section description"
                }, {
                    name: "image1",
                    value: "https://example.com/images/150"
                }],
            },
            {
                // id: "usersecaside",
                type: "div",
                props: [],

                //redundant to add children like this, as we'll allow the end user to add in another 
                // components to the body itself

                // children: [{
                //     id: "usersecaside-blankspace",
                //     type: "children",
                //     props: []
                // }],

                // later, just allow the user to add stuff to it, have a flag or something, that indicates containers/ the comps that take in 
                // children
                children: []
            }
        ]
    },
    "PageDiv": {
        type: "div",
        // takesChildren: true,
        state: [],
        props: [],
        children: [],
        effects: [],
        actions: []
    }
}

// finally, when a userdef comp is added, the dynamic props: {} are populated recursively
// section -> card -> title
// section is being defined : props: [title]
// card: props[cardtitle]: val -> props:{section}:title 
// title: <text> tag : props[text] : val -> props:{card}:cardtitle

// then when it's used, populate with the id, after traversing the tree
// section -> id: 123
// card -> id: xyz, prop : props:123:title
// title -> id: abx, prop: props:xyz:cardtitle

// also take care that the nesting could be well inside, so even the n+2th child should be able to track the nearest {dyn-parent-assigned-id}

// now only the renderer recursive func, would take the f(nodestructure), and the node props will be resolved from the state tree, and id tracking/resolution of parents in some way

// better would be to just separate the two, the structure state from the prop state...

// only for copy pasta the component subtrees or while deffining the user def comps,
//  do we need to have meta-references, cause we don't have the ids of the parent components, for the child comps to refer 
// for dependent props or states