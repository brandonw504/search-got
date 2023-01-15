import styles from '../styles/Home.module.css'

export default function PeopleList({setFeatured, people, searchTerm}) {
    if (!people) people = []

    return (
        <div className={styles.peopleList}>
            {people.filter(person => {
                if (searchTerm === "") {
                    return person; 
                } else if (person.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return person;
                }
            }).map((person, i) => {
                return (
                    <img key={i} src={person.imageUrl} alt={person.fullName} onClick={() => setFeatured(person)}/>
                )
            })}
        </div>
    )
}