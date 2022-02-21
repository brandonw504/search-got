import { FaSearch, FaTimes } from "react-icons/fa"
import { useState, useEffect } from "react"
import Head from "next/head"
import Aos from "aos"
import "aos/dist/aos.css"

import styles from '../styles/Home.module.css'

export default function Home() {
    useEffect(() => {
        Aos.init({ duration: 1000 });
        loadPeople();
    }, []);

    let gotPeople = [];

    const placeholder = {
        fullName: "Click on a character to learn about them!"
    }
    
    const [people, setPeople] = useState([])
    const [featuredPerson, setFeaturedPerson] = useState(placeholder)
    const [searchTerm, setSearchTerm] = useState("")

    const loadPeople = async () => {
        try {
            const res = await fetch('https://thronesapi.com/api/v2/Characters');
            gotPeople = await res.json();
            setPeople(gotPeople)
        } catch(err) {
            console.error(err);
        }
    };

    const FeaturedTile = () => {
        return (
            <div>
                <h1>{featuredPerson.fullName}</h1>
                <p>{featuredPerson.title}</p>
                <p>{featuredPerson.family}</p>
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Game of Thrones Characters</title>
            </Head>
            <div className={styles.container}>
                <div data-aos="fade" className={styles.container}>
                    <h1>Game of Thrones Characters</h1>
                    <p>Search for a character from the Game of Thrones series and learn about them!</p>
                </div>
                <div data-aos="fade" className={styles.search}>
                    <FaSearch />
                    <input 
                        type="text"
                        id="searchBar"
                        className={styles.searchBar}
                        placeholder="Search by character name"
                        value={searchTerm}
                        onInput={e => setSearchTerm(() => e.target.value)}
                    />
                    <FaTimes onClick={() => setSearchTerm("")}/>
                </div>
                <div data-aos="fade" data-aos-delay="150" className={styles.peopleList}>
                    {people.filter(person => {
                        if (searchTerm === "") {
                            return person; 
                        } else if (person.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return person;
                        }
                    }).map(person => {
                        return (
                            <div onClick={() => setFeaturedPerson(person)}>
                                <img src={person.imageUrl} alt={person.fullName}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div data-aos="fade" data-aos-delay="300" className={styles.description}>
                <FeaturedTile />
            </div>
        </div>
    )
}
