

const { useState } = React;

export function AnimalPreview({ animalInfos }) {

    const [animals, setAnimals] = useState(animalInfos);

    return (
        <React.Fragment>
            {animals.map(animal => (
                <tr key={animal.type}>
                    <td>{animal.type}</td>
                    <td>{animal.count}</td>
                    <td><a href={`https://www.google.com/search?q=${animal.type}`}>Search</a></td>
                </tr>
            ))}
        </React.Fragment>
    )
}