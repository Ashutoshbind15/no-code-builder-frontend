import { Text } from "./Text"

export const Card = ({ title, description, image1, image2, image3 }) => {
    return (
        <div className="bg-blue-500">
            <h1 id="card-title" className="text-2xl font-bold">{title}</h1>
            <Text text={description} className="text-sm text-green-500" />
            <img src={image1} alt="image1" />
            <img src={image2} alt="image2" />
            <img src={image3} alt="image3" />
        </div>
    )
}