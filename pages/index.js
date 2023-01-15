import { useState, useEffect } from "react"
import Head from "next/head"
import TypewriterComponent from 'typewriter-effect'

import SearchBar from "./search_bar"
import PeopleList from "./people_list"
import styles from '../styles/Home.module.css'

export default function Home() {
    const loadPeople = async () => {
        try {
            const res = await fetch('https://thronesapi.com/api/v2/Characters');
            gotPeople = await res.json();
            setPeople(gotPeople)
        } catch(err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        loadPeople();
    }, []);

    let gotPeople = [];

    const placeholder = {
        fullName: "Click on a character to learn about them!"
    }
    
    const [people, setPeople] = useState([])
    const [featuredPerson, setFeaturedPerson] = useState(placeholder)
    const [searchTerm, setSearchTerm] = useState("")

    const setSearch = (searchData) => setSearchTerm(searchData)
    const setFeatured = (featuredData) => setFeaturedPerson(featuredData)

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
                <h1>
                    <TypewriterComponent onInit={(typewriter) => typewriter.typeString("Game of Thrones Characters").start()} />
                </h1>
                <p>Search for a character from the Game of Thrones series and learn about them!</p>

                <SearchBar setSearch = {setSearch} searchTerm = {searchTerm} />
                <PeopleList setFeatured = {setFeatured} people = {people} searchTerm = {searchTerm} />
            </div>
            <div className={styles.description}>
                <FeaturedTile />
            </div>
        </div>
    )
}
