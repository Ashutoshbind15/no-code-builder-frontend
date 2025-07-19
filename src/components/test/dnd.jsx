import React, { useState } from 'react'

const CategoryBody = () => {

    const [categories, setCategories] = useState([
        {
            name: "Basic",
            items: [{
                name: "Item 1",
            }, {
                name: "Item 2",
            }, {
                name: "Item 3",
            }]
        }, {
            name: "Medium",
            items: [{
                name: "Item 4",
            }, {
                name: "Item 5",
            }]
        }, {
            name: "Advanced",
            items: [{
                name: "Item 6",
            }]
        }
    ])

    const handleDrop = (e, title) => {
        const data = e.dataTransfer.getData('text/plain')
        const sourceCategory = e.dataTransfer.getData('sourceCategory')

        setCategories(categories.map((category) => {
            if (category.name === title) {
                // Add item to target category
                return { ...category, items: [...category.items, { name: data }] }
            } else if (category.name === sourceCategory) {
                // Remove item from source category
                return { ...category, items: category.items.filter(item => item.name !== data) }
            }
            return category
        }))
    }

    return (
        <div className='flex items-center justify-around p-4 shadow-lg rounded-lg border-b-2 border-gray-200'>
            {categories.map((category) => (
                <CategoryContainer key={category.name} title={category.name} items={category.items} handleDrop={handleDrop} />
            ))}
        </div>
    )
}

const CategoryContainer = ({ title, items, handleDrop }) => {

    return (
        <div className="border-2 border-gray-200 rounded-lg p-2 w-full m-4 p-4" onDrop={(e) => handleDrop(e, title)} onDragOver={(e) => e.preventDefault()}>
            <div className='text-lg font-bold'>{title}</div>
            <div className='flex flex-col gap-2'>
                {items.map((item) => (
                    <CategoryItem key={item.name} name={item.name} categoryName={title} />
                ))}
            </div>
        </div>
    )
}

const CategoryItem = ({ name, categoryName }) => {

    const handleDragStart = (e) => {
        console.log("dragging", name)
        e.dataTransfer.setData('text/plain', name)
        e.dataTransfer.setData('sourceCategory', categoryName)
    }

    return (
        <div className='flex items-center justify-between p-2 shadow-lg rounded-lg border-b-2 border-gray-200' draggable onDragStart={handleDragStart}>
            <div className='text-lg font-bold'>{name}</div>
        </div>
    )
}

const Dnd = () => {
    return (
        <div>
            <CategoryBody />
        </div>
    )
}

export default Dnd