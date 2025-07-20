export const starterState = {
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
                        type: "userdef:Card",
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
                        type: "userdef:Container",
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
                                        }]
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

export const userDefComps = {
    "Card": {
        type: "div",
        takesChildren: false,
        props: [{
            name: "className",
            defaultValue: "bg-blue-500"
        }, {
            name: "title",
            defaultValue: "Hello"
        }, {
            name: "description",
            defaultValue: "This is a description"
        }, {
            name: "image1",
            defaultValue: "https://via.placeholder.com/150"
        }, {
            name: "image2",
            defaultValue: "https://via.placeholder.com/150"
        }, {
            name: "image3",
            defaultValue: "https://via.placeholder.com/150"
        }],
        effects: [
            {
                id: 'card-test-effect',
                trigger: 'onLoad',
                effect: () => {
                    console.log('card-test-effect');
                },
                dependencies: []
            }
        ],
        state: [
            {
                id: 'card-test-state',
                type: 'string',
                value: 'Hello'
            }
        ],
        body: [{
            id: "card-title",
            type: "h1",
            props: [{
                name: "className",
                value: "text-2xl font-bold"
            }, {
                name: "title",
                value: "prop:title"
            }],
            children: [{
                id: "card-title-text",
                type: "stringLiteral",
                props: [{
                    name: "text",
                    value: "prop:title"
                }]
            }]
        },
        {
            id: "card-description",
            type: "userdef:Text",
            props: [{
                name: "className",
                value: "text-sm text-gray-500"
            }, {
                name: "text",
                value: "prop:description"
            }],
            children: []
        },
        {
            id: "card-image1",
            type: "img",
            props: [{
                name: "src",
                value: "prop:image1"
            }]
        }, {
            id: "card-image2",
            type: "img",
            props: [{
                name: "src",
                value: "prop:image2"
            }]
        }, {
            id: "card-image3",
            type: "img",
            props: [{
                name: "src",
                value: "prop:image3"
            }]
        }]
    },
    "Container": {
        type: "div",
        takesChildren: true,
        props: [{
            name: "className",
            defaultValue: "bg-red-500"
        }],
        body: [{
            id: "container-children",
            type: "children",
        }, {
            id: "container-child-2",
            type: "p",
            props: [{
                name: "className",
                value: "text-sm text-gray-500"
            }, {
                name: "text",
                value: "Hello again"
            }],
            children: [
                {
                    id: "container-child-2-text",
                    type: "stringLiteral",
                    props: [{
                        name: "text",
                        value: "prop:text"
                    }]
                }
            ]
        }]
    },
    "Text": {
        type: "p",
        takesChildren: false,
        props: [{
            name: "className",
            defaultValue: "text-sm text-gray-500"
        }, {
            name: "text",
            defaultValue: "Hello"
        }],
        body: [{
            id: "text-content",
            type: "p",
            props: [{
                name: "className",
                value: "prop:className"
            }, {
                name: "text",
                value: "prop:text"
            }],
            children: [{
                id: "text-content-text",
                type: "stringLiteral",
                props: [{
                    name: "text",
                    value: "prop:text"
                }]
            }]
        }]
    }
}