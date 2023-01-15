import { FaSearch, FaTimes } from "react-icons/fa"

import styles from '../styles/Home.module.css'

export default function SearchBar({setSearch, searchTerm}) {
    return (
        <div className={styles.search}>
            <FaSearch />
            <input 
                type="text"
                id="searchBar"
                className={styles.searchBar}
                placeholder="Search by character name"
                value={searchTerm}
                onInput={e => setSearch(() => e.target.value)}
            />
            <FaTimes onClick={() => setSearch("")}/>
        </div>
    )
}