
import { AnimalPreview } from './AnimalPreview.jsx'

export function AnimalList({ animalInfos }) {

    return (
        <section className="animals-list-container">
            <table>
                <thead>
                    <tr>
                        <th>Animal Type</th>
                        <th>Count</th>
                        <th>Search</th>
                    </tr>
                </thead>
                <tbody>
                <AnimalPreview animalInfos={animalInfos} />
                </tbody>
            </table>
        </section>
    )
}