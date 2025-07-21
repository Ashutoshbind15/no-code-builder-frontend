export const customStarterState = {
    root: {
        id: "root",
        type: "div",
        // keeping the effects and state on the top level while rendering, while building, push it down the tree and optimize
        effects: [],
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
                children: [
                    {
                        id: "sidebar-button",
                        type: "button",
                        props: [{
                            name: "className",
                            value: "bg-blue-500"
                        }],
                        actions: [{
                            trigger: "onClick",
                            actionParams: ["mutatestate", "ctrval", "inc"]
                        }],
                        children: [{
                            id: "sidebar-button-text",
                            type: "stringLiteral",
                            props: [{
                                name: "text",
                                value: "Click me"
                            }]
                        }]
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
                        }, {
                            name: "image2",
                            value: "https://example.com/images/150"
                        }, {
                            name: "image3",
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
                                        type: "p",
                                        props: [{
                                            name: "className",
                                            value: "text-sm text-gray-500"
                                        }],
                                        children: [{
                                            id: "main-content-container-child-div-child-p-text",
                                            type: "stringLiteral",
                                            props: [{
                                                name: "text",
                                                value: "state:ctrval"
                                            }]
                                        },
                                        {
                                            id: "random-text",
                                            type: "predef:Text",
                                            props: [{
                                                name: "className",
                                                value: "text-sm text-gray-500"
                                            }, {
                                                name: "text",
                                                value: "userdef in userdef"
                                            }],

                                        }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]

    }
}

export const customComponentsMetadata = {
    "Card": {
        takesChildren: false,
    },
    "Container": {
        takesChildren: true
    },
    "Text": {
        takesChildren: false
    },
}

export const userDefComps = {

}