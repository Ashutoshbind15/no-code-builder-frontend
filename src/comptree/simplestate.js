// for now, we're refraining from defining the user-def comps, for simpler, 
// faster iterations with a fe editor, 

// user def comps can be defined later, cause of the meta ref approach, 
// which'll just recursively generate ids for the nodes, and also populate
// the nodes with defaults, define inter dependency chains(props, states, effects)


// The Literal, Card, Image components are custom, and dont take in children
// Whilst, the Container custom component can take in children

// Use the metadata in order to understand whether a comp takes in children, use that while the dnd is in place, 
// for editing the structure state

export const treeSampleState = {
    id: "div:0",
    children: [
        {
            id: "div:1",
            children: [
                {
                    id: "button:1.1",
                    children: [{
                        id: "p:Literal:1.1.1"
                    }]
                }
            ]
        },
        {
            id: "main:2",
            children: [
                {
                    id: "p:Card:2.1"
                },
                {
                    id: "p:Container:2.2",
                    children: [
                        {
                            id: "div:2.2.1",
                            children: [
                                {
                                    id: "p:Text:2.2.1.1"
                                }
                            ]
                        },
                        {
                            id: "img:2.2.2",
                        }
                    ]
                }
            ]
        },
        {
            id: "div:3",
            children: [
                {
                    id: "p:Card:3.1",
                }
            ]
        }
    ]
}

export const treeSampleEvalState = {
    "div:0": {
        props: {
            className: "flex flex-col my-4 gap-y-4 justify-between px-6"
        },
    },
    "div:1": {
        props: {
            className: "w-1/4 bg-red-500 self-center"
        },
        // add state later
    },
    "button:1.1": {
        props: {
            className: "bg-blue-500"
        },
        // add actions later
    },
    "main:2": {
        props: {
            className: "p-4 bg-green-500"
        },
    },
    "p:Card:2.1": {
        props: {
            title: "Hello",
            description: "This is a description",
            image1: "https://example.com/images/150"
        },
    },
    "p:Container:2.2": {
        props: {
            className: "bg-blue-500"
        },
    },
    "div:2.2.1": {
        props: {
            className: "bg-green-500"
        },
    },
    "p:Text:2.2.1.1": {
        props: {
            className: "text-sm text-gray-500",
            text: "Hello again"
        },
    },
    "div:3": {
        props: {}
    },
    "p:Card:3.1": {
        props: {
            title: "Another card",
            description: "This is another card",
            image1: "https://example.com/images/150"
        },
    },
    "img:2.2.2": {
        props: {
            // object type prop
            style: {
                width: "250px",
                height: "250px",
                objectFit: "cover",
            },
            src: "https://example.com/images/150"
        },
    }
}

export const literalValuesSampleState = {
    "p:Literal:1.1.1": "Click me",
}